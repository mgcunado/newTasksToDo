import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
  ) {}

  async create(category: CreateCategoryDto) {
    const categoryFound = await this.categoryRepository.findOne({
      where: { name: category.name },
    })

    if (categoryFound) {
      throw new HttpException('Category already exists', HttpStatus.BAD_REQUEST)
    }

    const newCategory = this.categoryRepository.create(category)
    return this.categoryRepository.save(newCategory)
  }

  async getCategories() {
    const categories = await this.categoryRepository.find()
    return {
      status: 'success',
      categories,
    }
  }

  // using translation in backend
  // async getCategories(i18n: any) {
  //   const categories = await this.categoryRepository.find()
  //   categories.forEach(category => {
  //     category.name = i18n.t(`categories.${category.name}`)
  //   })
  //   return {
  //     status: 'success',
  //     categories,
  //   }
  // }

  async getCategory(id: number) {
    const categoryFound = await this.categoryRepository.findOne({
      where: { id },
    })

    if (!categoryFound) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND)
    }

    return categoryFound
  }

  async updateCategory(id: number, category: UpdateCategoryDto) {
    const categoryFound = await this.categoryRepository.findOne({
      where: { id },
    })

    if (!categoryFound) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND)
    }

    const updatedCategory = Object.assign(categoryFound, category)

    return this.categoryRepository.save(updatedCategory)
  }

  async deleteCategory(id: number) {
    const result = await this.categoryRepository.delete({ id })

    if (result.affected === 0) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND)
    }

    return result
  }
}
