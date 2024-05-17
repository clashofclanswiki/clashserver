import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { CategoryService } from './category.service'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { CreateCategoryDto } from './dto/create-category.dto'

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto)
  }

  @Get()
  async findAll() {
    return this.categoryService.findAll()
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return this.categoryService.findOne(slug)
  }

  @Patch(':slug')
  async update(
    @Param('slug') slug: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoryService.update(slug, updateCategoryDto)
  }

  @Delete(':slug')
  async remove(@Param('slug') slug: string) {
    return this.categoryService.remove(slug)
  }
}
