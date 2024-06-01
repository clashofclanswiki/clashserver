import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/pisma.service'
import { PostDto } from './post.dto'
import { Prisma } from '@prisma/client'

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getAll(skip = 0, take = 10, title?: string) {
    const where: Prisma.PostWhereInput = title
      ? {
          title: {
            contains: title,
            mode: 'insensitive'
          }
        }
      : {}

    const allPosts = await this.prisma.post.findMany({
      where,
      include: {
        category: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take
    })

    const total = await this.prisma.post.count({ where })

    return {
      data: allPosts,
      total,
      skip: Number(skip),
      take: Number(take)
    }
  }

  async getPostBySlug(slug: string) {
    return this.prisma.post.findUnique({ where: { slug: slug } })
  }

  async create(dto: PostDto, userId: string, categoryId: string) {
    return this.prisma.post.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId
          }
        },
        category: {
          connect: {
            id: categoryId
          }
        }
      }
    })
  }

  async update(
    dto: Partial<PostDto>,
    slug: string,
    userId: string,
    newCategoryId?: string
  ) {
    const post = await this.prisma.post.findFirst({
      where: {
        slug,
        userId
      }
    })

    if (!post) {
      throw new Error('Post not found')
    }

    const updateData: Record<string, any> = {
      ...dto
    }

    if (newCategoryId) {
      updateData.category = {
        connect: {
          id: newCategoryId
        }
      }
    }

    return this.prisma.post.update({
      where: {
        id: post.id
      },
      data: updateData
    })
  }

  async delete(slug: string) {
    const post = await this.prisma.post.findUnique({
      where: {
        slug
      }
    })

    if (!post) {
      throw new Error(`Post with slug "${slug}" not found`)
    }

    return this.prisma.post.delete({
      where: {
        slug
      }
    })
  }

  async updateCountOpened(slug: string) {
    return this.prisma.post.update({
      where: {
        slug
      },
      data: {
        countOpened: {
          increment: 1
        }
      }
    })
  }
}
