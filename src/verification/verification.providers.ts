import { Connection } from 'mongoose';
import { VerificationSchema } from './entities/verification.entity';

export const verificationProviders = [
  {
    provide: 'VERIFICATION_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Verification', VerificationSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
