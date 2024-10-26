import { Controller, Get, Param } from '@nestjs/common';
import { LessonService } from './lesson.service';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Get('course/:courseId')
  findAllByCourse(@Param('courseId') courseId: string) {
    return this.lessonService.findAllByCourseId(courseId);
  }

  @Get('course/:courseId/:id')
  findOneByCourse(
    @Param('courseId') courseId: string,
    @Param('id') id: string,
  ) {
    return this.lessonService.findOneByCourseId(courseId, id);
  }
}
