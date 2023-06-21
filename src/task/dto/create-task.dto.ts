import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  task: string;
  deadline?: string;
  realizationDate?: string;
  done?: boolean;
  comment?: string;
  priorityId?: number;
}
