//import { th } from '@faker-js/faker';
import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConfigService } from '@nestjs/config';
import { ParticipantService } from './participant/participant.service';

interface IDataMessage {
  sender: string;
  reciver: string;
  message: string;
}

@WebSocketGateway({
  cors: {
    origin: new ConfigService().get('CLIENT_URL'),
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  myClients: any[] = [];
  myUsersOnline: string[] = [];

  // eslint-disable-next-line
  constructor(private readonly participantService: ParticipantService) {
    const tempOnline = this.participantService.findAllParticipantsOnline();
    tempOnline.then((res) => {
      this.myUsersOnline = res.map((element) => element.nickname);
      res.forEach((element:any) => {
        const findClient = this.myClients.find(myclient=> myclient.nickname === element.nickname);
        if(findClient){
          findClient.online = true;
        }
      });
      });
  }


  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('WebSocket initialized', server._opts);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
    //console.log('client args: ', args);
    this.myClients.push({
      id: client.id,
      nickname: '',
      status: 'online',
      online: true,
      role: 'viewer',
      presentationActive: '',
    });
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    //this.server.emit('left', nickname);
    const userLeaving = this.myClients.find(
      (element) => element.id === client.id,
    );
    if (userLeaving) {
      //console.log(`Client ${client.id} left nickname: ${userLeaving.nickname}`);
      this.participantService.updateByNickname(userLeaving.nickname, {online: false});
      this.myClients = this.myClients.filter(
        (element) => element.id !== client.id,
      );
      this.server.emit('left', this.myClients);
    }
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: IDataMessage): void {
    console.log(`Received message: ${payload}`);
    const objDataMsg = payload;
    //console.log('objData: ', objDataMsg);
    const { reciver, sender } = objDataMsg;
    console.log('reciver: ', reciver);
    console.log('sender: ', sender);
    //console.log('My clients: ', this.myClients);
    const findReciver = this.myClients.find((element) => element.nickname === reciver);
    if(findReciver){
      //console.log(`Reciver found: ${findReciver.nickname}`);
      this.server.to(findReciver.id).emit('messageRecived', JSON.stringify(objDataMsg));
    }else{
      console.log(`Reciver not found: ${reciver}`);
    }
    //this.server.emit('message', `Hello, you sent -> ${payload}`);
    //return `Hello, you sent -> ${payload}`;
  }

  @SubscribeMessage('join')
  handleJoinRoom(client: Socket, dataJoin: string): void {
    //client.join(nickname);
    //client.emit('joined', nickname);
    console.log('New participant: ');
    console.log(`Client ${client.id} joined data: ${dataJoin}`);
    const objData = JSON.parse(dataJoin);
    const foundClient = this.myClients.find(myclient=> myclient.id === client.id);
    if(!foundClient){
      this.myClients.push({
        id: client.id,
        nickname: objData.nickname,
        status: 'online',
        online: true,
        role: 'viewer',
        presentationActive: objData.presentationActive || '',
      });
    }
    this.myClients.forEach((element) => {
      if (element.id === client.id) {
        element.nickname = objData.nickname;
        element.online = true;
        element.presentationActive = objData.presentationActive;
      }
    });
    const clientsOnline = this.myClients.filter((element) => element.online);
    console.log('Clients online: ', clientsOnline);

    this.server.emit('joined', this.myClients);
    this.server.emit('updatedParticipant', this.myClients);
  }

  @SubscribeMessage('leave')
  handleLeaveRoom(client: Socket, nickname: string): void {
    //client.leave(nickname);
    //client.emit('left', nickname);
    console.log(`Client ${client.id} left nickname: ${nickname}`);
    this.myClients = this.myClients.filter(
      (element) => element.nickname !== nickname,
    );
    this.server.emit('updatedParticipant', this.myClients);
  }

  @SubscribeMessage('updateParticipant')
  handleUpdateParticipant(client: Socket, dataUpdateParticipant: string): void {
    /*
    console.log(
      `Client ${client.id} updateParticipant: ${dataUpdateParticipant}`,
    );
    */
    const objData = JSON.parse(dataUpdateParticipant);
    this.myClients.forEach((element) => {
      if (element.nickname === objData.nickname) {
        element.role = objData.role;
      }
    });
    this.server.emit('updatedParticipant', this.myClients);
  }

  @SubscribeMessage('getDataSlide')
  handleGetDataSlide(client: Socket, dataReload: string): void {
    //console.log(`Client ${client.id} getDataSlide: ${dataReload}`);

    this.server.emit('fetchDataSlide', dataReload);
  }

  @SubscribeMessage('reloadDataPresentation')
  handleReloadDataPresentation(client: Socket, presentationId: string): void {
    //console.log(`Client ${client.id} reloadDataPresentation: ${dataReload}`);

    this.server.emit('fetchDataPresentation', presentationId);
  }

  @SubscribeMessage('call-user')
  handleCallUser(client: Socket, data: any, ): void {
    console.log('Call-user data: ', data);
    console.log('Call-user client: ', client.id);
    const to= this.myClients.find((element) => element.nickname === data.reciver).id;
    //const { signal, to } = data;
    this.server.to(to).emit('call-made', { signal:data.signal, sender: data.sender, reciver: data.reciver });
  }

  @SubscribeMessage('answer-call')
  handleAnswerCall(client: Socket, data: any ): void {
    console.log('Answer-call data: ', data);
    console.log('Answer-call client: ', client);
    const to= this.myClients.find((element) => element.nickname === data.sender).id;
    //const { signal, to } = data;
    this.server.to(to).emit('call-answered', { signal:data.signal, sender: data.sender, reciver: data.reciver });
  }

  @SubscribeMessage('image-message')
  handleImageMessage(client: Socket, data: any): void {
    //console.log('Image-message data: ', data);
    //console.log('Image-message client: ', client);
    const to= this.myClients.find((element) => element.nickname === data.reciver).id;
    this.server.to(to).emit('image-message-recived', data);
  }

}
