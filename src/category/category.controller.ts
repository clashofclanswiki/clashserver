import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { CategoryService } from './category.service'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { CreateCategoryDto } from './dto/create-category.dto'

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(
    @Query('skip') skip = 0,
    @Query('take') take = 10,
    @Query('title') title?: string
  ) {
    return this.categoryService.findAll(Number(skip), Number(take), title)
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto)
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return this.categoryService.findOne(slug)
  }

  @Put(':slug')
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
