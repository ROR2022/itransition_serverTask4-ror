import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { CreateVerificationDto } from './dto/create-verification.dto';
import { UpdateVerificationDto } from './dto/update-verification.dto';
import { UserService } from 'src/user/user.service';

export interface VerificationConfirm {
  verificationId: string;
  code: string;
}


@Controller('verification')
export class VerificationController {
  constructor(
    private readonly verificationService: VerificationService,
    private readonly userService: UserService
  ) {}

  @Post('confirm')
  confirm(@Body() dataConfirm: VerificationConfirm) {
    //console.log('Controller dataConfirm:',dataConfirm);
    return this.verificationService.confirm(dataConfirm);
  }

  @Post()
  create(@Body() createVerificationDto: CreateVerificationDto) {
    
    const user = this.userService.findOneByEmail(createVerificationDto.email);
    if(!user){
      return { message: 'Email not found', success: false };
    }
    
    if(!createVerificationDto.code){
      createVerificationDto.code = Math.floor(1000 + Math.random() * 9000).toString();
    }
    //console.log('Controller createVerificationDto:',createVerificationDto);
    return this.verificationService.createRecovery(createVerificationDto);
  }

  @Post('reactive')
  reactive(@Body() myBody: any) {
    //console.log('Controller createVerificationDto:',createVerificationDto);
    //console.log('Controller Reactive Verification email:',email);
    //return email;
    const userEmail = myBody.email;
    const createVerificationDtoTMP: CreateVerificationDto = {
      email: userEmail,
      code: Math.floor(1000 + Math.random() * 9000).toString(),
      userId: ''
    }
    return this.verificationService.createReactive(createVerificationDtoTMP);
  }

  

  
}
