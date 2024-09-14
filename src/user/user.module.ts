import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { DatabaseModule } from '../database/database.module';
import { VerificationService } from 'src/verification/verification.service';
import { verificationProviders } from 'src/verification/verification.providers';
//import { VerificationModule } from 'src/verification/verification.module';
import { databaseProviders } from 'src/database/database.providers';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MailerService } from 'src/mailer/mailer.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    UserService,
    ...userProviders,
    ...verificationProviders,
    ...databaseProviders,
    VerificationService,
    JwtService,
    MailerService,
  ],
  exports: [UserService],
})
export class UserModule {}
