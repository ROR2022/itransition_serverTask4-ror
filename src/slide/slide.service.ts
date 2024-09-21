import { Inject, Injectable } from '@nestjs/common';
import { CreateSlideDto } from './dto/create-slide.dto';
import { UpdateSlideDto } from './dto/update-slide.dto';
import { Model } from 'mongoose';
import { Slide } from './entities/slide.entity';

@Injectable()
export class SlideService {

  constructor(
    @Inject('SLIDE_MODEL')
    private slideModel: Model<Slide>,
  ) {}

  create(createSlideDto: CreateSlideDto) {
    //return 'This action adds a new slide';
    const createdSlide = new this.slideModel(createSlideDto);
    return createdSlide.save();
  }

  findAll() {
    //return `This action returns all slide`;
    return this.slideModel.find().populate('textblocks').exec();
  }

  findOne(id: string) {
    //return `This action returns a #${id} slide`;
    return this.slideModel.findById(id).populate('textblocks').exec();
  }

  update(id: string, updateSlideDto: UpdateSlideDto) {
    //return `This action updates a #${id} slide`;
    return this.slideModel.findByIdAndUpdate(id, updateSlideDto, {new: true}).exec();
  }

  addTextblock(slideId: string, textblockId: string) {
    //console.log('adding: ',slideId, textblockId);
    return this.slideModel.findByIdAndUpdate(slideId, { $push: { textblocks: textblockId } }, { new: true }).exec();
  }

  remove(id: string) {
    //return `This action removes a #${id} slide`;
    return this.slideModel.findByIdAndDelete(id).exec();
  }
}
