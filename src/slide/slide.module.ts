import { Module } from '@nestjs/common';
import { SlideService } from './slide.service';
import { SlideController } from './slide.controller';
import { DatabaseModule } from 'src/database/database.module';
import { databaseProviders } from 'src/database/database.providers';
import { slideProviders } from './slide.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [SlideController],
  providers: [SlideService, ...databaseProviders, ...slideProviders],
})
export class SlideModule {}
