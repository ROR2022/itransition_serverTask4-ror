import { Injectable, Inject } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { Model } from 'mongoose';
import { Conversation } from './entities/conversation.entity';

@Injectable()
export class ConversationService {

  constructor(
    // eslint-disable-next-line
    @Inject('CONVERSATION_MODEL')
    private conversationModel: Model<Conversation>,
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

  findByParticipantId(participantId: string) {
    //return `This action returns a conversation with participantId ${participantId}`;
    return this.conversationModel.find({participants: participantId}).populate(['participants','messages']).exec();
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
