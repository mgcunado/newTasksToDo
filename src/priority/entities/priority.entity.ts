import { Task } from "src/task/entities/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'priority' })
export class Priority {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true, nullable: false, length: 8 })
  // low, medium, high, urgent
  level: string

  @OneToMany(() => Task, Task => Task.priority)
  tasks: Task[]
} 
