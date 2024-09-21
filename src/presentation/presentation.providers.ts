import { Connection } from 'mongoose';
import { PresentationSchema } from './entities/presentation.entity';

export const presentationProviders = [
  {
    provide: 'PRESENTATION_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Presentation', PresentationSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
