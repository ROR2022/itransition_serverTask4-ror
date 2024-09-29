import { Injectable, Inject } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { Model } from 'mongoose';
import { Participant } from './entities/participant.entity';

@Injectable()
export class ParticipantService {

  constructor(
    // eslint-disable-next-line
    @Inject('PARTICIPANT_MODEL')
    private participantModel: Model<Participant>,
  ) {}

  create(createParticipantDto: CreateParticipantDto) {
    //return 'This action adds a new participant';
    const createdParticipant = new this.participantModel(createParticipantDto);
    return createdParticipant.save();
  }

  findAll() {
    //return `This action returns all participant`;
    return this.participantModel.find().exec();
  }

  findAllParticipantsOnline() {
    //return `This action returns all participant online`;
    return this.participantModel.find({status: 'online'}).exec();
  }

  findOne(id: string) {
    //return `This action returns a #${id} participant`;
    return this.participantModel.findById(id).exec();
  }

  findByNickname(nickname: string) {
    //return `This action returns a participant with nickname ${nickname}`;
    return this.participantModel.findOne({nickname: nickname}).exec();
  }

  update(id: string, updateParticipantDto: UpdateParticipantDto) {
    //return `This action updates a #${id} participant`;
    return this.participantModel.findByIdAndUpdate(id, updateParticipantDto, {new: true}).exec();
  }

  updateByNickname(nickname: string, updateParticipantDto: UpdateParticipantDto) {
    //return `This action updates a participant with nickname ${nickname}`;
    return this.participantModel.findOneAndUpdate({nickname: nickname}, updateParticipantDto, {new: true}).exec();
  }

  addHideConversation(body: any) {
    //return `This action adds a new hide conversation to a participant with nickname ${body.nickname}`;
    return this.participantModel.findOneAndUpdate({nickname: body.nickname}, {$push: {hideConversations: body.conversationId}}, {new: true}).exec();
  }

  remove(id: string) {
    //return `This action removes a #${id} participant`;
    return this.participantModel.findByIdAndDelete(id).exec();
  }
}
