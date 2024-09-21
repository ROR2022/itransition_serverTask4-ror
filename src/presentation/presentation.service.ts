import { Inject, Injectable } from '@nestjs/common';
import { CreatePresentationDto } from './dto/create-presentation.dto';
import { UpdatePresentationDto } from './dto/update-presentation.dto';
import { Model } from 'mongoose';
import { Presentation } from './entities/presentation.entity';

@Injectable()
export class PresentationService {

  constructor(
    @Inject('PRESENTATION_MODEL')
    private presentationModel: Model<Presentation>,
  ) {}

  create(createPresentationDto: CreatePresentationDto) {
    //return 'This action adds a new presentation';
    const presentation = new this.presentationModel(createPresentationDto);
    return presentation.save();
  }

  findAll() {
    //return `This action returns all presentation`;
    //console.log('PresentationService:findAll');
    return this.presentationModel.find().populate('slides').exec();
  }

  findOne(id: string) {
    //return `This action returns a #${id} presentation`;
    return this.presentationModel.findById(id).exec();
  }

  update(id: string, updatePresentationDto: UpdatePresentationDto) {
    //return `This action updates a #${id} presentation`;
    return this.presentationModel.findByIdAndUpdate(id, updatePresentationDto, { new: true }).exec();
  }

  addSlide(id: string, newSlide: string) {
    //return `This action adds a new slide to a #${id} presentation`;
    return this.presentationModel.findByIdAndUpdate(id, { $push: { slides: newSlide } }, { new: true }).exec();
  }

  async addUser(id: string, newUser: string) {
    //return `This action adds a new user to a #${id} presentation`;
    const objNewUser = { nickname: newUser, role: 'viewer' };
    const myPresentation = await  this.presentationModel.findById(id).exec();
    if (!myPresentation) {
      return null;
    }
    const users = myPresentation.users;
    for (let i = 0; i < users.length; i++) {
      if (users[i].nickname === newUser) {
        return myPresentation;
      }
    }
    return this.presentationModel.findByIdAndUpdate(id, { $push: { users: objNewUser } }, { new: true }).exec();
  }

  async editUser(id: string, user: string, role: string) {
    //return `This action edits a user in a #${id} presentation`;
    const myPresentation = await  this.presentationModel.findById(id).exec();
    if (!myPresentation) {
      return null;
    }
    const users = myPresentation.users;
    for (let i = 0; i < users.length; i++) {
      if (users[i].nickname === user) {
        users[i].role = role;
        return this.presentationModel.findByIdAndUpdate(id, { users: users }, { new: true }).exec();
      }
    }
    return myPresentation;
  }

  remove(id: string) {
    //return `This action removes a #${id} presentation`;
    return this.presentationModel.findByIdAndDelete(id).exec();
  }
}
