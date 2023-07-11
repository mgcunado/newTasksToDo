import { Priority } from "src/priority/entities/priority.entity";
import { Subcategory } from "src/subcategory/entities/subcategory.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  task: string

  @Column({  nullable: true, type: 'date' })
  deadline: Date

  @Column({  nullable: true, type: 'date' })
  realizationDate: Date

  // in database table to make field tinyint(1) we need put option width: 1
  @Column({ type: 'bool', width: 1,  default: false })
  done: boolean

  @Column({ nullable: true, type: 'text' })
  comment: string

  @Column()
  subcategoryId: number

  @ManyToOne(() => Subcategory, subcategory => subcategory.tasks)
  subcategory: Subcategory

  // by default priority will be low (1)
  @Column({ default: 1 })
  priorityId: number

  @ManyToOne(() => Priority, priority => priority.tasks)
  priority: Priority

  @Column({ nullable: true })
  authorId?: number 

  @ManyToOne(() => User, user => user.tasks, { nullable: true })
  author?: User
}
