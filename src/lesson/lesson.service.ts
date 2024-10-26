import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}

  async findAllByCourseId(courseId: string) {
    return this.prisma.lesson.findMany({
      where: {
        courseId,
      },
    });
  }

  async findOneByCourseId(courseId: string, id: string) {
    return this.prisma.lesson.findFirst({
      where: {
        id,
        courseId,
      },
    });
  }
}
