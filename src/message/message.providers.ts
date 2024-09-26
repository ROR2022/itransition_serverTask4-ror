import { Connection } from 'mongoose';
import { MessageSchema } from './entities/message.entity';

export const messageProviders = [
  {
    provide: 'MESSAGE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Message', MessageSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
