import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { userProviders } from 'src/user/user.providers';
import { databaseProviders } from 'src/database/database.providers';
import { MailerService } from 'src/mailer/mailer.service';
import { VerificationService } from 'src/verification/verification.service';
import { verificationProviders } from 'src/verification/verification.providers';

@Module({
  imports: [UserModule],
  providers: [
    AuthService,
    JwtService,
    UserService,
    ...userProviders,
    ...databaseProviders,
    ...verificationProviders,
    MailerService,
    VerificationService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
