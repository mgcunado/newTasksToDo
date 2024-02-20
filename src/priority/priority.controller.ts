import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PriorityService } from './priority.service';
import { CreatePriorityDto } from './dto/create-priority.dto';
import { UpdatePriorityDto } from './dto/update-priority.dto';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JWTAuthGuard)
@Controller('priority')
export class PriorityController {
  constructor(private readonly priorityService: PriorityService) {}

  @Post()
  createPriority(@Body() createPriorityDto: CreatePriorityDto) {
    return this.priorityService.createPriority(createPriorityDto);
  }

  @Get()
  getPriorities() {
    return this.priorityService.getPriorities();
  }

  @Get(':id')
  getPriority(@Param('id') id: string) {
    return this.priorityService.getPriority(+id);
  }

  @Patch(':id')
  updatePriority(@Param('id') id: string, @Body() priority: UpdatePriorityDto) {
    return this.priorityService.updatePriority(+id, priority);
  }

  @Delete(':id')
  deletePriority(@Param('id') id: string) {
    return this.priorityService.deletePriority(+id);
  }
}
