import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { Repository } from 'typeorm';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { Subcategory } from './entities/subcategory.entity';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectRepository(Subcategory) private subcategoryRepository: Repository<Subcategory>,
    private categoryService: CategoryService
  ) {}

  async createSubcategory(categoryId: number, createSubcategoryDto: CreateSubcategoryDto): Promise<Subcategory> {
    const categoryFound = await this.categoryService.getCategory(categoryId)

    if (!categoryFound) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND)
    }

    const newSubcategory = this.subcategoryRepository.create({
      ...createSubcategoryDto,
      categoryId: categoryId,
    });
    return await this.subcategoryRepository.save(newSubcategory)
  }

  async getSubcategories(categoryId: number) {
    const categoryFound = await this.categoryService.getCategory(categoryId)

    if (!categoryFound) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND)
    }

    const subcategories = await this.subcategoryRepository.find({
      where: { categoryId },
    })
    return {
      status: 'success',
      subcategories,
    }
  }

  async getSubcategory(categoryId: number, id: number) {
    const subcategoryFound = await this.subcategoryRepository.findOne({
      where: { id, categoryId },
      relations: ['category']
    })

    if (!subcategoryFound) {
      throw new HttpException('Subcategory not exist or not found in this category', HttpStatus.NOT_FOUND)
    }

    return subcategoryFound
  }

  async updateSubcategory(categoryId: number, id: number, subcategory: UpdateSubcategoryDto) {
    const subcategoryFound = await this.subcategoryRepository.findOne({
      where: { id, categoryId },
    })

    if (!subcategoryFound) {
      throw new HttpException('Subcategory not found', HttpStatus.NOT_FOUND)
    }

    const updatedSubcategory = Object.assign(subcategoryFound, subcategory)

    return this.subcategoryRepository.save(updatedSubcategory)
  }

  async deleteSubcategory(id: number) {
    const result = await this.subcategoryRepository.delete({ id })

    if (result.affected === 0) {
      throw new HttpException('Subcategory not found', HttpStatus.NOT_FOUND)
    }

    return result
  }
}
