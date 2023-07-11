import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({"message" : "Task field cannot be empty"})
  task: string;
  deadline?: string;
  realizationDate?: string;
  done?: boolean;
  comment?: string;
  priorityId?: number;
}
