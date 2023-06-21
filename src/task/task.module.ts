import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './entities/task.entity';
import { CategoryModule } from 'src/category/category.module';
import { SubcategoryModule } from 'src/subcategory/subcategory.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    CategoryModule,
    SubcategoryModule,
  ],
  controllers: [TaskController],
  providers: [TaskService] 
})
export class TaskModule {}
