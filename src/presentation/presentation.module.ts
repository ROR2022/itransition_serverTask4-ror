import { Module } from '@nestjs/common';
import { PresentationService } from './presentation.service';
import { PresentationController } from './presentation.controller';
import { DatabaseModule } from 'src/database/database.module';
import { databaseProviders } from 'src/database/database.providers';
import { presentationProviders } from './presentation.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PresentationController],
  providers: [
    PresentationService,
    ...databaseProviders,
    ...presentationProviders,
  ],
  exports: [PresentationService],
})
export class PresentationModule {}
