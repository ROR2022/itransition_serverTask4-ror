import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to the iTransition_Internship-task4 NestJS API!';
  }
}
