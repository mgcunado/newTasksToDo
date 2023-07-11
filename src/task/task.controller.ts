import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JWTAuthGuard)
  @Post('categories/:categoryId/subcategories/:subcategoryId/tasks')
  create(
    @Param('categoryId') categoryId: string,
    @Param('subcategoryId') subcategoryId: string,
    @Body() createTaskDto: CreateTaskDto,
  ): any {
    return this.taskService.createTask(+categoryId, +subcategoryId, createTaskDto);
  }

  @Get('tasks/:todo?')
  getAllTasks(@Param('todo') todo?: string, @Query('orderBy') orderBy?: string) {
    const orderByObj = orderBy ? JSON.parse(decodeURIComponent(orderBy)) : undefined;
    return this.taskService.getAllTasks(todo, orderByObj);
  }

  @Get('search/:todo?/:search?')
  searchTasks(@Param('todo') todo?: string, @Param('search') search?: string, @Query('orderBy') orderBy?: string) {
    const orderByObj = orderBy ? JSON.parse(decodeURIComponent(orderBy)) : undefined;
    return this.taskService.searchTasks(todo, search, orderByObj);
  }

  @Get('categories/:categoryId/subcategories/:subcategoryId/tasks')
  getTasks(@Param('categoryId') categoryId: string, @Param('subcategoryId') subcategoryId: string) {
    return this.taskService.getTasks(+categoryId, +subcategoryId);
  }

  @Get('categories/:categoryId/subcategories/:subcategoryId/tasks/:id')
  getTask(@Param('categoryId') categoryId: string, @Param('subcategoryId') subcategoryId: string, @Param('id') id: string) {
    return this.taskService.getTask(+categoryId, +subcategoryId, +id);
  }

  @UseGuards(JWTAuthGuard)
  @Patch('categories/:categoryId/subcategories/:subcategoryId/tasks/:id')
  update(@Param('categoryId') categoryId: string, @Param('subcategoryId') subcategoryId: string, @Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.updateTask(+categoryId, +subcategoryId, +id, updateTaskDto);
  }

  @UseGuards(JWTAuthGuard)
  @Delete('categories/:categoryId/subcategories/:subcategoryId/tasks/:id')
  deleteTask(@Param('categoryId') categoryId: string, @Param('subcategoryId') subcategoryId: string, @Param('id') id: string) {
    return this.taskService.deleteTask(+categoryId, +subcategoryId, +id);
  }
}
