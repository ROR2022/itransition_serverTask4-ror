import { Injectable, Inject } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { Model } from 'mongoose';
import { Conversation } from './entities/conversation.entity';
import { ParticipantService } from 'src/participant/participant.service';
//import { error } from 'console';

@Injectable()
export class ConversationService {

  constructor(
    // eslint-disable-next-line
    @Inject('CONVERSATION_MODEL')
    private conversationModel: Model<Conversation>,
    private participantService: ParticipantService,
  ) {}

  async create(createConversationDto: CreateConversationDto) {
    //return 'This action adds a new conversation';
    const createdConversation = new this.conversationModel(createConversationDto);
    const newConversation = await createdConversation.save();
    return this.conversationModel.findById(newConversation._id).populate(['participants','messages']).exec();
  }

  findAll() {
    //return `This action returns all conversation`;
    return this.conversationModel.find().exec();
  }

  findOne(id: string) {
    //return `This action returns a #${id} conversation`;
    return this.conversationModel.findById(id).populate(['participants','messages']).exec();
  }

  async findByParticipantId(participantId: string) {
    if(!participantId){
      return {error: 'Participant id is required'};
    }
    
    const isParticipantExist = await this.participantService.findOne(participantId);
    if(!isParticipantExist){
      return {error: 'No participant found with this id'};
    }
    const conversations:any = await this.conversationModel
    .find({participants:{$in:[participantId]}})
    .populate(['participants','messages']);

    //console.log('findByParticipantId  conversations:...', conversations);
    if (!conversations || conversations.length === 0) {
      return { error: 'No conversations found for this participant' };
    }

    return conversations
    }

  update(id: string, updateConversationDto: UpdateConversationDto) {
    //return `This action updates a #${id} conversation`;
    return this.conversationModel.findByIdAndUpdate(id, updateConversationDto, {new: true}).exec();
  }

  addMessage(conversationId: string, messageId: string) {
    //return `This action adds a message ${messageId} to conversation ${conversationId}`;
    return this.conversationModel.findByIdAndUpdate(conversationId, {$push: {messages: messageId}}, {new: true}).exec();
  }

  remove(id: string) {
    //return `This action removes a #${id} conversation`;
    return this.conversationModel.findByIdAndDelete(id).exec();
  }

  removeAll() {
    //return `This action removes all conversation`;
    return this.conversationModel.deleteMany().exec();
  }
}
