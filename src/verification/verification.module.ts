import { Module } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { VerificationController } from './verification.controller';
import { verificationProviders } from './verification.providers';
import { databaseProviders } from 'src/database/database.providers';
import { UserService } from 'src/user/user.service';
import { userProviders } from 'src/user/user.providers';
import { MailerService } from 'src/mailer/mailer.service';
import { JwtService } from '@nestjs/jwt';

import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [VerificationController],
  providers: [
    VerificationService,
    ...verificationProviders,
    ...databaseProviders,
    ...userProviders,
    UserService,
    MailerService,
    JwtService,
  ],
  exports: [VerificationService],
})
export class VerificationModule {}
