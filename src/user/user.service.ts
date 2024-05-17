import { Injectable } from '@nestjs/common'
import { hash } from 'argon2'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { PrismaService } from 'src/pisma.service'
import { UserDto } from './user.dto'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id
      },
      include: {
        posts: true
      }
    })
  }

  getBuEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email
      }
    })
  }

  async getProfile(id: string) {
    const profile = await this.getById(id)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = profile

    return {
      user: rest
    }
  }

  async create(dto: AuthDto) {
    const user = {
      email: dto.email,
      password: await hash(dto.password)
    }

    return this.prisma.user.create({
      data: user
    })
  }

  async update(id: string, dto: UserDto) {
    let data = dto

    if (dto.password) {
      data = { ...dto, password: await hash(dto.password) }
    }

    return this.prisma.user.update({
      where: {
        id
      },
      data,
      select: {
        username: true,
        email: true
      }
    })
  }
}
