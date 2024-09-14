import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
//import { AuthGuard } from './auth.guard';
//import { Request } from 'express';
import { ValidationPipe } from '../common/filters/http-exception/validation.pipe';
//import { Get, UseGuards, Request } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';

export interface SignInDto {
    email: string;
    password: string;
  }

@Controller('auth')
export class AuthController {
    //eslint-disable-next-line prettier/prettier
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body(new ValidationPipe()) signInDto: SignInDto) {
      //console.log('Inicia el login de: ', signInDto);
      return this.authService.login(signInDto);
    }


    @Post('register')
    signUp(@Body(new ValidationPipe()) signUpDto: CreateUserDto) {
      //console.log('Inicia el registro de: ', signUpDto)
      return this.authService.register(signUpDto);
    }

    @Post('recovery')
    recovery(@Body() recoveryDto: any) {
      return this.authService.recovery(recoveryDto);
    }

    @Post('reactive')
  reactive(@Body() dataReactive: any) {
    return this.authService.reactive(dataReactive);
  }
}
