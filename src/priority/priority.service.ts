import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePriorityDto } from './dto/create-priority.dto';
import { UpdatePriorityDto } from './dto/update-priority.dto';
import { Priority } from './entities/priority.entity';

@Injectable()
export class PriorityService {
  constructor(
    @InjectRepository(Priority) private priorityRepository: Repository<Priority>,
  ) {}

  async createPriority(priority: CreatePriorityDto) {
    const priorityFound = await this.priorityRepository.findOne({
      where: { level: priority.level },
    })

    if (priorityFound) {
      throw new HttpException('Priority already exists', HttpStatus.BAD_REQUEST)
    }

    const newPriority = this.priorityRepository.create(priority)
    return this.priorityRepository.save(newPriority)
  }

  async getPriorities() {
    const priorities = await this.priorityRepository.find({
      order: { id: "ASC" }
    })

    return {
      status: 'success',
      priorities,
    }
  }

  async getPriority(id: number) {
    const priorityFound = await this.priorityRepository.findOne({
      where: { id },
    })

    if (!priorityFound) {
      throw new HttpException('Priority not found', HttpStatus.NOT_FOUND)
    }

    return priorityFound
  }

  async updatePriority(id: number, priority: UpdatePriorityDto) {
    const priorityFound = await this.priorityRepository.findOne({
      where: { id },
    })

    if (!priorityFound) {
      throw new HttpException('Priority not found', HttpStatus.NOT_FOUND)
    }

    const updatedPriority = Object.assign(priorityFound, priority)

    return this.priorityRepository.save(updatedPriority)
  }

  async deletePriority(id: number) {
    const result = await this.priorityRepository.delete({ id })

    if (result.affected === 0) {
      throw new HttpException('Priority not found', HttpStatus.NOT_FOUND)
    }

    return result
  }
}
