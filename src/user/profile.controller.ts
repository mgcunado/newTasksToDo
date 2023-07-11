import {
  Controller,
  UseGuards,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  Param,
  ParseIntPipe,
  Put,
  Body,
  Post,
} from '@nestjs/common';

import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SessionAuthGuard } from '../auth/guards/session-auth.guard';
import { ProfileService } from './profile.service';
import { Profile } from './profile.entity';

@Controller('users/:userId/profile')
@UseGuards(JWTAuthGuard, SessionAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  get(@Param('userId', new ParseIntPipe()) userId: number): Promise<Profile> {
    return this.profileService.findOne({ where: { userId } });
  }

  @Post()
  create(
    @Param('userId', new ParseIntPipe()) userId: number,
    @Body() profile: any,
  ): Promise<Object> {
    return this.profileService.create(userId, profile);
  }

  @Put()
  update(
    @Param('userId', new ParseIntPipe()) userId: number,
    @Body() updateProfile: any,
  ): Promise<Object> {
    return this.profileService.update(userId, updateProfile);
  }
}
