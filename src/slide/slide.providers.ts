import { Connection } from 'mongoose';
import { SlideSchema } from './entities/slide.entity';

export const slideProviders = [
  {
    provide: 'SLIDE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Slide', SlideSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
