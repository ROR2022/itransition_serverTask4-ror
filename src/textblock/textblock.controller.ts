import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TextblockService } from './textblock.service';
import { CreateTextblockDto } from './dto/create-textblock.dto';
import { UpdateTextblockDto } from './dto/update-textblock.dto';

@Controller('textblock')
export class TextblockController {
  //eslint-disable-next-line
  constructor(private readonly textblockService: TextblockService) {}

  @Post()
  create(@Body() createTextblockDto: CreateTextblockDto) {
    return this.textblockService.create(createTextblockDto);
  }

  @Get()
  findAll() {
    return this.textblockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.textblockService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTextblockDto: UpdateTextblockDto) {
    return this.textblockService.update(id, updateTextblockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.textblockService.remove(id);
  }
}
