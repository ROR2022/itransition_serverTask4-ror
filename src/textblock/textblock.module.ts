import { Module } from '@nestjs/common';
import { TextblockService } from './textblock.service';
import { TextblockController } from './textblock.controller';
import { DatabaseModule } from 'src/database/database.module';
import { textblockProviders } from './textblock.providers';
import { databaseProviders } from 'src/database/database.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [TextblockController],
  providers: [TextblockService, ...textblockProviders, ...databaseProviders],
})
export class TextblockModule {}
