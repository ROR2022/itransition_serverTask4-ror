import { Injectable, Inject } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Model } from 'mongoose';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {

  constructor(
    // eslint-disable-next-line
    @Inject('MESSAGE_MODEL')
    private messageModel: Model<Message>,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    //return 'This action adds a new message';
    const createdMessage = new this.messageModel(createMessageDto);
    const newMessage = await createdMessage.save();
    return this.messageModel.findById(newMessage._id).populate(['sender','conversation','reciver']).exec();
  }

  findAll() {
    //return `This action returns all message`;
    return this.messageModel.find().exec();
  }

  findOne(id: string) {
    //return `This action returns a #${id} message`;
    return this.messageModel.findById(id).populate(['sender','conversation','reciver']).exec();
  }

  update(id: string, updateMessageDto: UpdateMessageDto) {
    //return `This action updates a #${id} message`;
    return this.messageModel.findByIdAndUpdate(id, updateMessageDto, {new: true}).exec();
  }

  remove(id: string) {
    //return `This action removes a #${id} message`;
    return this.messageModel.findByIdAndDelete(id).exec();
  }

  removeAll() {
    //return `This action removes all message`;
    return this.messageModel.deleteMany().exec();
  }
}
