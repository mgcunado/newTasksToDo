import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';

@Controller('categories/:categoryId/subcategories')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Post()
  createSubcategory(@Param('categoryId') categoryId: string, @Body() subcategory: CreateSubcategoryDto) {
    return this.subcategoryService.createSubcategory(+categoryId, subcategory);
  }

  @Get()
  getSubcategories(@Param('categoryId') categoryId: string) {
    return this.subcategoryService.getSubcategories(+categoryId);
  }

  @Get(':id')
  getSubcategory(@Param('categoryId') categoryId: string, @Param('id') id: string) {
    return this.subcategoryService.getSubcategory(+categoryId, +id);
  }

  @Patch(':id')
  update(@Param('categoryId') categoryId: string, @Param('id') id: string, @Body() updateSubcategoryDto: UpdateSubcategoryDto) {
    return this.subcategoryService.updateSubcategory(+categoryId, +id, updateSubcategoryDto);
  }

  @Delete(':id')
  deleteSubcategory(@Param('id') id: string) {
    return this.subcategoryService.deleteSubcategory(+id);
  }
}
