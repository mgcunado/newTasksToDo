import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, IsNull } from 'typeorm';
import { CategoryService } from 'src/category/category.service';
// import { Subcategory } from 'src/subcategory/entities/subcategory.entity';
import { SubcategoryService } from 'src/subcategory/subcategory.service';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
// import { I18n, I18nContext } from 'nestjs-i18n';

interface CreateTaskResponse {
  status: string;
  task: Task;
}

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService,
  ) {}

  async createTask(categoryId: number, subcategoryId: number, createTaskDto: CreateTaskDto): Promise<CreateTaskResponse> {
    const subcategoryFound = await this.subcategoryService.getSubcategory(categoryId, subcategoryId)

    if (!subcategoryFound) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND)
    }

    const newTask = this.taskRepository.create({
      ...createTaskDto,
      subcategoryId: subcategoryId,
    });

    const task = await this.taskRepository.save(newTask)
    return {
      status: 'created',
      task,
    }
  }

  // tellMeCategory(@I18n() i18n: I18nContext) {
  tellMeCategory(i18n: any) {
    return i18n.t(`categories.invoices`);
  }

  async getAllTasks(todo?: string, orderBy: { [key: string]: 'ASC' | 'DESC' } = { task: 'ASC' }): Promise<{ status: string; tasks: Task[] }> {
    const done = todo === 'true';
    const tasks = await this.taskRepository.find({
      order: orderBy,
      where: {
        deadline: Not(IsNull()),
        done: done ? false : undefined,
      },
      relations: ['subcategory', 'priority']
    })

    if (!tasks) {
      throw new HttpException('Tasks not found', HttpStatus.NOT_FOUND)
    }

    return {
      status: 'success',
      tasks,
    }
  }

  async getTasks(categoryId: number, subcategoryId: number): Promise<Task[]> {
    const categoryFound = await this.categoryService.getCategory(categoryId)
    const subcategoryFound = await this.subcategoryService.getSubcategory(categoryId, subcategoryId)

    if (!categoryFound || !subcategoryFound) {
      throw new HttpException('Category or Subcategory not found', HttpStatus.NOT_FOUND)
    }

    return this.taskRepository.find({
      where: { subcategoryId },
      relations: ['subcategory', 'priority']
    })
  }

  async getTask(categoryId: number, subcategoryId: number, id: number) {
    const categoryFound = await this.categoryService.getCategory(categoryId)
    const subcategoryFound = await this.subcategoryService.getSubcategory(categoryId, subcategoryId)

    if (!categoryFound || !subcategoryFound) {
      throw new HttpException('Category or Subcategory not found', HttpStatus.NOT_FOUND)
    }

    const taskFound = await this.taskRepository.findOne({
      where: { id, subcategoryId },
      relations: ['subcategory', 'priority']
    })

    if (!taskFound) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND)
    }

    return {
      status: 'success',
      task: taskFound,
    }
  }

  async updateTask(categoryId: number, subcategoryId: number, id: number, task: UpdateTaskDto) {
    // check if subcategory exists
    await this.subcategoryService.getSubcategory(categoryId, subcategoryId)

    const taskFound = await this.taskRepository.findOne({
      where: { id, subcategoryId },
    })

    if (!taskFound) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND)
    }

    let updatedTask = Object.assign(taskFound, task)

    // return this.taskRepository.save(updatedTask)

    updatedTask = await this.taskRepository.save(updatedTask)
    return {
      status: 'success',
      task: updatedTask,
    }
  }

  async deleteTask(categoryId: number, subcategoryId: number, id: number) {
    // check if subcategory exists
    await this.subcategoryService.getSubcategory(categoryId, subcategoryId)

    const taskDeleted = await this.taskRepository.delete({ id })

    if (taskDeleted.affected === 0) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND)
    }

    return {
      status: 'success',
      taskDeleted,
    }
  }

  async searchTasks(todo?: string, search?: string, orderBy: { [key: string]: 'ASC' | 'DESC' } = { task: 'ASC' }): Promise<{ status: string; tasks: Task[] }> {
    const done = todo === 'true';
    const [key, value] = Object.entries(orderBy)[0];

    const foundTasks = await this.taskRepository
      .createQueryBuilder('task')
      .where('task.deadline IS NOT NULL')
      .andWhere(done ? 'task.done = :done' : '1=1', { done: false })
      .andWhere('task.task LIKE :search OR task.comment LIKE :search', { search: `%${search}%` })
      .leftJoinAndSelect('task.subcategory', 'subcategory')
      .leftJoinAndSelect('task.priority', 'priority')
      .orderBy(`task.${key}`, value)
      .getMany();

    if (!foundTasks) {
      throw new HttpException('Tasks not found', HttpStatus.NOT_FOUND)
    }

    return {
      status: 'success',
      tasks: foundTasks,
    }
  }
}
