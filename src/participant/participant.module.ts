import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';
import { DatabaseModule } from 'src/database/database.module';
import { databaseProviders } from 'src/database/database.providers';
import { participantProviders } from './participant.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ParticipantController],
  providers: [
    ParticipantService,
    ...databaseProviders,
    ...participantProviders,
  ],
  exports: [ParticipantService],
})
export class ParticipantModule {}
