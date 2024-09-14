import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }


  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Put('updateActive')
  updateActive(@Body() listUsers: any[]) {
    listUsers.forEach(async (user) => {
      await this.userService.update(user.id, {active: user.active});
    });
    return {message: 'Users updated', listUsers};
    //return this.userService.updateActive(updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Post('deleteUsers')
  deleteUsers(@Body() listUsers: string[]) {
    listUsers.forEach(async (user) => {
      await this.userService.remove(user);
    });
    return {message: 'Users deleted', listUsers};
    //return this.userService.deleteUsers(updateUserDto);
  }
}
