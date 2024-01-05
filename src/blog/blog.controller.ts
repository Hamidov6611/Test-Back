import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('addTask')
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @Get('getTasks')
  findAll() {
    return this.blogService.findAll();
  }

  @Get('completeTask/:id')
  completeTask(@Param('id') id: number) {
    return this.blogService.completeTask(id);
  }
}
