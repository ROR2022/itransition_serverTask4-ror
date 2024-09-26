import { Connection } from 'mongoose';
import { ConversationSchema } from './entities/conversation.entity';

export const conversationProviders = [
  {
    provide: 'CONVERSATION_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Conversation', ConversationSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
