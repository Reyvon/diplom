import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNewsPostDto } from './dto/create-post.dto';
import { UpdateNewsPostDto } from './dto/update-post.dto';
import { NewsPost } from './entities/post.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsPost)
    private newsPostRepository: Repository<NewsPost>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createNewsPostDto: CreateNewsPostDto): Promise<NewsPost> {
    const user = await this.userRepository.findOne({ where: { id: createNewsPostDto.userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newPost = this.newsPostRepository.create({
      ...createNewsPostDto,
      user,
    });

    return this.newsPostRepository.save(newPost);
  }

  async findAll(): Promise<NewsPost[]> {
    return this.newsPostRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<NewsPost> {
    const post = await this.newsPostRepository.findOne({ where: { id }, relations: ['user'] });
    if (!post) {
      throw new NotFoundException('News post not found');
    }
    return post;
  }

  async update(id: number, updateNewsPostDto: UpdateNewsPostDto): Promise<NewsPost> {
    const post = await this.findOne(id);

    if (updateNewsPostDto.userId) {
      const user = await this.userRepository.findOne({ where: { id: updateNewsPostDto.userId } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      post.user = user;
    }

    Object.assign(post, updateNewsPostDto);

    return this.newsPostRepository.save(post);
  }

  async remove(id: number): Promise<void> {
    const result = await this.newsPostRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('News post not found');
    }
  }
}
