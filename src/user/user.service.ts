import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async getProfile(id: string) {
    const profile = await this.getById(id);

    const statistics = await this.prisma.userProgress.findMany({
      where: {
        userId: id,
      },
    });

    const review = await this.prisma.userReview.findMany({
      where: {
        userId: id,
      },
    });

    return {
      profile,
      statistics,
      review,
    };
  }

  createUser(User: CreateUserDto) {
    return this.prisma.user.create({
      data: User,
    });
  }

  async updateUser(id: string, dto: UpdateUserDto) {
    let data = dto;

    if (dto.password) {
      data = {
        ...dto,
        password: await hash(dto.password),
      };
    }

    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }
}
