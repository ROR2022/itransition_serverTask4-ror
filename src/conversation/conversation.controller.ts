import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';

@Controller('conversation')
export class ConversationController {
  // eslint-disable-next-line
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  create(@Body() createConversationDto: CreateConversationDto) {
    return this.conversationService.create(createConversationDto);
  }

  @Get()
  findAll() {
    return this.conversationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conversationService.findOne(id);
  }

  @Get('byParticipantId/:participantId')
  findByParticipantId(@Param('participantId') participantId: string) {
    console.log('participantId:...', participantId);
    return this.conversationService.findByParticipantId(participantId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConversationDto: UpdateConversationDto) {
    return this.conversationService.update(id, updateConversationDto);
  }

  @Put('addMessage')
  addMessage(@Query('conversationId') conversationId: string, @Query('messageId') messageId: string) {
    return this.conversationService.addMessage(conversationId, messageId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conversationService.remove(id);
  }

  @Delete()
  removeAll() {
    return this.conversationService.removeAll();
  }
}
