import { Connection } from 'mongoose';
import { TextblockSchema } from './entities/textblock.entity';

export const textblockProviders = [
  {
    provide: 'TEXTBLOCK_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Textblock', TextblockSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
