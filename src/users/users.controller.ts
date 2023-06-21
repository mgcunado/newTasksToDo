import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService ) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers()
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.getUser(id)
  }

  @Post()
  createUser(@Body() newUser: CreateUserDto): Promise<User> {
    return this.usersService.createUser(newUser)
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): any {
    return this.usersService.deleteUser(id)
  }

  @Patch(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto): Promise<User> {
    return this.usersService.updateUser(id, user)
  }

  @Post(':id/profile')
  createProfile(@Param('id', ParseIntPipe) id: number, @Body() profile: CreateProfileDto ) {
    return this.usersService.createProfile(id, profile)
  }
} 
