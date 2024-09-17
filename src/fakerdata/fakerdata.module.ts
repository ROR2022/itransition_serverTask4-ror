import { Module } from '@nestjs/common';
import { FakerdataService } from './fakerdata.service';
import { FakerdataController } from './fakerdata.controller';

@Module({
  providers: [FakerdataService],
  controllers: [FakerdataController],
})
export class FakerdataModule {}
