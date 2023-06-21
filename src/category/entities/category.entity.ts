import { Subcategory } from "src/subcategory/entities/subcategory.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true, nullable: false, length: 80 })
  name: string

  @Column({ default: 'active' })
  status: string

  @Column({ default: 'defaultCategory.png' })
  image: string

  @OneToMany(() => Subcategory, Subcategory => Subcategory.category)
  subcategories: Subcategory[]
}
