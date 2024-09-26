import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { VerificationModule } from './verification/verification.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { databaseProviders } from './database/database.providers';
import { MailerModule } from './mailer/mailer.module';
import { FakerdataModule } from './fakerdata/fakerdata.module';
import { PresentationModule } from './presentation/presentation.module';
import { SlideModule } from './slide/slide.module';
import { TextblockModule } from './textblock/textblock.module';
import { ChatGateway } from './chat.gateway';
import { ParticipantModule } from './participant/participant.module';
import { ConversationModule } from './conversation/conversation.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    JwtModule.register({
      global: true,
      secret: new ConfigService().get('JWT_SECRET'),
      signOptions: {
        expiresIn: new ConfigService().get('JWT_EXPIRES_IN'),
      },
    }),
    UserModule,
    AuthModule,
    DatabaseModule,
    VerificationModule,
    MailerModule,
    FakerdataModule,
    PresentationModule,
    SlideModule,
    TextblockModule,
    ParticipantModule,
    ConversationModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService, ...databaseProviders, ChatGateway],
  exports: [JwtService],
})
export class AppModule {}
