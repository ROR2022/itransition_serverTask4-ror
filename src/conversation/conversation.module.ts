import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { DatabaseModule } from 'src/database/database.module';
import { databaseProviders } from 'src/database/database.providers';
import { conversationProviders } from './conversation.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ConversationController],
  providers: [
    ConversationService,
    ...databaseProviders,
    ...conversationProviders,
  ],
})
export class ConversationModule {}
