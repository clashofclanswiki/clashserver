import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/pisma.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Prisma } from '@prisma/client'

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async findAll(skip = 0, take = 10, title?: string, type?: string) {
    const where: Prisma.CategoryWhereInput = {
      ...(title && {
        title: {
          contains: title,
          mode: 'insensitive'
        }
      }),
      ...(type && { type })
    }

    const allCategories = await this.prisma.category.findMany({
      where,
      include: {
        posts: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take
    })

    const total = await this.prisma.category.count({ where })

    return {
      data: allCategories,
      total,
      skip: Number(skip),
      take: Number(take)
    }
  }

  async create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: createCategoryDto
    })
  }

  async findOne(slug: string, skip = 0, take = 10) {
    const category = await this.prisma.category.findUnique({
      where: { slug }
    })

    if (!category) {
      throw new Error(`Category with slug ${slug} not found`)
    }

    const posts = await this.prisma.post.findMany({
      where: { categoryId: category.id },
      include: {
        category: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take
    })

    const totalPosts = await this.prisma.post.count({
      where: {
        categoryId: category.id
      }
    })

    return {
      data: category,
      posts: {
        data: posts,
        total: totalPosts,
        skip: Number(skip),
        take: Number(take)
      }
    }
  }

  async update(slug: string, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { slug },
      data: updateCategoryDto
    })
  }

  async remove(slug: string) {
    return this.prisma.category.delete({
      where: { slug }
    })
  }
}
