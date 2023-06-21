import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
// import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  create(@Body() category: CreateCategoryDto) {
    return this.categoryService.create(category);
  }

  @Get()
  getCategories() {
    return this.categoryService.getCategories();
  }

  // using translation in backend
  // @Get()
  // getCategories(@I18n() i18n: I18nContext) {
  //   return this.categoryService.getCategories(i18n);
  // }

  @Get(':id')
  getCategory(@Param('id') id: string) {
    // +id is used to convert the `id` parameter from a string to a number
    return this.categoryService.getCategory(+id);
  }

  @Patch(':id')
  updateCategory(@Param('id', ParseIntPipe) id: number, @Body() category: UpdateCategoryDto) {
    return this.categoryService.updateCategory(id, category);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(+id);
  }
}
