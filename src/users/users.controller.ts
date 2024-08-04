import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from 'src/auth/roles'; 
import { AuthGuard } from 'src/auth/auth.guard'; 
import { Roles } from 'src/auth/roles.decorator'; 

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'user', 'writer')
  @Post('add-user')
  async create(@Body() createUserDto: CreateUserDto) {
    console.log("hello controller");
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      console.error('Error during user creation:', error);
      throw error;
    }
  }

  @Post('login-user')
  async loginUser(@Body('email') email: string, @Body('password') password: string) {
    console.log("email", email);
    try {
      return await this.usersService.login(email, password);
    } catch (error) {
      console.error('Error during user login:', error);
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Get('list-user')
  async findAll() {
    return await this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('user/:id')
  async findOne(@Param('id') id: number) {
    return await this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.usersService.remove(id);
  }
}
