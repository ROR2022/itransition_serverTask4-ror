import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { DatabaseModule } from 'src/database/database.module';
import { databaseProviders } from 'src/database/database.providers';
import { messageProviders } from './message.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [MessageController],
  providers: [MessageService, ...databaseProviders, ...messageProviders],
})
export class MessageModule {}
