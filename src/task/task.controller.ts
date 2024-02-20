import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
// import { Request } from 'express';

@UseGuards(JWTAuthGuard)
@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('categories/:categoryId/subcategories/:subcategoryId/tasks')
  create(
    @Param('categoryId') categoryId: string,
    @Param('subcategoryId') subcategoryId: string,
    @Body() createTaskDto: any,
    @Req() request: any,
  ): any {
    const userId = request?.user?.id;
    return this.taskService.createTask(+categoryId, +subcategoryId, createTaskDto, +userId);
  }

  @Get('tasks/:todo?')
  getAllTasks(
    @Req() request: any,
    @Param('todo') todo?: string,
    @Query('orderBy') orderBy?: string,
  ) {
    const userId = request?.user?.id;
    const orderByObj = orderBy ? JSON.parse(decodeURIComponent(orderBy)) : undefined;
    return this.taskService.getAllTasks(+userId, todo, orderByObj);
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

  @Patch('categories/:categoryId/subcategories/:subcategoryId/tasks/:id')
  update(@Param('categoryId') categoryId: string, @Param('subcategoryId') subcategoryId: string, @Param('id') id: string, @Body() updateTaskDto: any) {
    return this.taskService.updateTask(+categoryId, +subcategoryId, +id, updateTaskDto);
  }

  @Delete('categories/:categoryId/subcategories/:subcategoryId/tasks/:id')
  deleteTask(@Param('categoryId') categoryId: string, @Param('subcategoryId') subcategoryId: string, @Param('id') id: string) {
    return this.taskService.deleteTask(+categoryId, +subcategoryId, +id);
  }
}
