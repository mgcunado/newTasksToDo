import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { CreateProfileDto } from './dto/profile-create.dto';
import { UpdateProfileDto } from './dto/profile-update.dto';

import { Profile } from './profile.entity';
import { UserService } from './user.service';

interface CreateProfileResponse {
  status: string;
  profile: Profile;
}

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private userService: UserService
  ) {}

  async create(userId: number, createProfileDto: CreateProfileDto): Promise<CreateProfileResponse> {
    const newProfile = this.profileRepository.create({
      ...createProfileDto,
      userId: userId,
    });

    const profile = await this.profileRepository.save(newProfile)

    await this.userService.update(userId, { profile });

    return {
      status: 'created',
      profile,
    }
  }

  async findOne(where: FindOneOptions<Profile>): Promise<Profile> {
    const profile = await this.profileRepository.findOne(where);

    if (!profile) {
      throw new NotFoundException(
        `There isn't any profile with identifier: ${where}`,
      );
    }

    return profile;
  }

  async update(userId: number, updates: UpdateProfileDto): Promise<CreateProfileResponse> {
    const profile = await this.profileRepository.findOne({ where: { userId } });

    if (!profile) {
      throw new NotFoundException(`There isn't any profile with userId: ${userId}`);
    }

    this.profileRepository.merge(profile, updates);

    const profileUpdated = await this.profileRepository.save(profile);
    return {
      status: 'updated',
      profile: profileUpdated,
    };
  }

  async removeProfile(profile: Profile) {
    await this.profileRepository.remove(profile);
  }
}
