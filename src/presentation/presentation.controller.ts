import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PresentationService } from './presentation.service';
import { CreatePresentationDto } from './dto/create-presentation.dto';
import { UpdatePresentationDto } from './dto/update-presentation.dto';

@Controller('presentation')
export class PresentationController {
  constructor(private readonly presentationService: PresentationService) {}

  @Post()
  create(@Body() createPresentationDto: CreatePresentationDto) {
    return this.presentationService.create(createPresentationDto);
  }

  @Get()
  findAll() {
    return this.presentationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.presentationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePresentationDto: UpdatePresentationDto) {
    return this.presentationService.update(id, updatePresentationDto);
  }

  @Put(':id')
  addSlide(@Param('id') id: string, @Body() body: { newSlide: string }) {
    const { newSlide } = body;
    return this.presentationService.addSlide(id, newSlide);
  }

  @Put('adduser/:id')
  addUser(@Param('id') id: string, @Body() body: { newUser: string }) {
    const { newUser } = body;
    return this.presentationService.addUser(id, newUser);
  }

  @Put('edituser/:id')
  editUser(@Param('id') id: string, @Body() body: { user: string, role: string }) {
    const { user, role } = body;
    return this.presentationService.editUser(id, user, role);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.presentationService.remove(id);
  }
}
