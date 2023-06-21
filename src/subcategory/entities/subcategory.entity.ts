import { Category } from "src/category/entities/category.entity";
import { Task } from "src/task/entities/task.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'subcategories' })
export class Subcategory {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true, nullable: false })
  name: string

  @Column({ default: 'active' })
  status: string

  @Column()
  categoryId: number

  @ManyToOne(() => Category, category => category.subcategories)
  category: Category

  @OneToMany(() => Task, Task => Task.subcategory)
  tasks: Task[]
}
