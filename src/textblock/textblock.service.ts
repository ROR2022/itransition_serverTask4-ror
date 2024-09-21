import { Inject, Injectable } from '@nestjs/common';
import { CreateTextblockDto } from './dto/create-textblock.dto';
import { UpdateTextblockDto } from './dto/update-textblock.dto';
import { Model } from 'mongoose';
import { Textblock } from './entities/textblock.entity';

@Injectable()
export class TextblockService {

  constructor(
    //eslint-disable-next-line
    @Inject('TEXTBLOCK_MODEL')
    private textblockModel: Model<Textblock>,
  ) {}

  create(createTextblockDto: CreateTextblockDto) {
    //return 'This action adds a new textblock';
    const createdTextblock = new this.textblockModel(createTextblockDto);
    return createdTextblock.save();
  }

  findAll() {
    //return `This action returns all textblock`;
    return this.textblockModel.find().exec();
  }

  findOne(id: string) {
    //return `This action returns a #${id} textblock`;
    return this.textblockModel.findById(id).exec();
  }

  update(id: string, updateTextblockDto: UpdateTextblockDto) {
    //return `This action updates a #${id} textblock`;
    return this.textblockModel.findByIdAndUpdate(id, updateTextblockDto, {new: true}).exec();
  }

  remove(id: string) {
    //return `This action removes a #${id} textblock`;
    return this.textblockModel.findByIdAndDelete(id).exec();
  }
}
