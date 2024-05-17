import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/pisma.service'
import { PostDto } from './post.dto'

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.post.findMany()
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
    // Найти пост по slug
    const post = await this.prisma.post.findUnique({
      where: {
        slug
      }
    })

    if (!post) {
      throw new Error(`Post with slug "${slug}" not found`)
    }

    // Удалить найденный пост
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
