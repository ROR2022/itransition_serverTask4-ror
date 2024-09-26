import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Controller('participant')
export class ParticipantController {
  // eslint-disable-next-line 
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  findAll() {
    return this.participantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.participantService.findOne(id);
  }

  @Get('byNickname/:nickname')
  findByNickname(@Param('nickname') nickname: string) {
    return this.participantService.findByNickname(nickname);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParticipantDto: UpdateParticipantDto) {
    return this.participantService.update(id, updateParticipantDto);
  }

  @Put('addhideConversation')
  addHideConversation(@Body() body: any) {
    return this.participantService.addHideConversation(body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.participantService.remove(id);
  }
}
