import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  async create(createBlogDto: CreateBlogDto) {
    const blog = await this.blogRepository.findOne({
      where: {
        title: createBlogDto.title,
      },
    });

    if (blog)
      throw new HttpException(
        'This task already exist',
        HttpStatus.BAD_REQUEST,
      );

    return await this.blogRepository.save(createBlogDto);
  }

  async findAll() {
    return await this.blogRepository.find({
      order: {
        status: 'ASC',
        createdAt: 'DESC',
      },
    });
  }

  async completeTask(id: number) {
    const blog = await this.blogRepository.findOne({
      where: {
        id,
      },
    });

    if (!blog) throw new NotFoundException('This category are not found');

    return await this.blogRepository.update(id, { ...blog, status: true });
  }
}
