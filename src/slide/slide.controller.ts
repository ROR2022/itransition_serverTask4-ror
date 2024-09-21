import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { SlideService } from './slide.service';
import { CreateSlideDto } from './dto/create-slide.dto';
import { UpdateSlideDto } from './dto/update-slide.dto';

@Controller('slide')
export class SlideController {
  constructor(private readonly slideService: SlideService) {}

  @Post()
  create(@Body() createSlideDto: CreateSlideDto) {
    return this.slideService.create(createSlideDto);
  }

  @Get()
  findAll() {
    return this.slideService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.slideService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSlideDto: UpdateSlideDto) {
    return this.slideService.update(id, updateSlideDto);
  }

  @Put(':id')
  addTextblock(@Param('id') id: string, @Body() body: { newTextblock: string }) {
    const { newTextblock } = body;
    return this.slideService.addTextblock(id, newTextblock);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.slideService.remove(id);
  }
}
