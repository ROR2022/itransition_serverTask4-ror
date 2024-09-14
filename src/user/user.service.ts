import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { hash } from 'bcrypt';
//import { VerificationService } from 'src/verification/verification.service';

@Injectable()
export class UserService {

  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
    
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    createUserDto.password = await hash(password, 10);
    createUserDto.active = false;
    
    const createdUser = new this.userModel(createUserDto);
    const dataNewUser:any = await createdUser.save();
    
    return dataNewUser;
  }

  async findAll() {
    //return `This action returns all user`;
    return this.userModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findOneByEmail(email: string) {
    //return `This action returns a #${email} user`;
    return this.userModel.findOne({email: email}).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    //return `This action updates a #${id} user`;
    return this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
  }

  

  remove(id: string) {
    //return `This action removes a #${id} user`;
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
