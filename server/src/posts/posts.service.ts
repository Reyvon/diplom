import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from 'src/user/entities/user.entity';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<PostEntity> {
    const user = await this.userRepository.findOne({ where: { id: createPostDto.userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${createPostDto.userId} not found`);
    }

    const post = new PostEntity();
    post.title = createPostDto.title;
    post.author = createPostDto.author;
    post.content = createPostDto.content;
    post.images = createPostDto.images || [];
    post.user = user;

    return this.postRepository.save(post);
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{ data: PostEntity[], total: number }> {
    const [result, total] = await this.postRepository.findAndCount({
      relations: ['user'],
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      data: result,
      total,
    };
  }

  async findOne(id: number): Promise<PostEntity> {
    const post = await this.postRepository.findOne({ where: { id }, relations: ['user'] });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    if (updatePostDto.title) {
      post.title = updatePostDto.title;
    }
    if (updatePostDto.author) {
      post.author = updatePostDto.author;
    }
    if (updatePostDto.content) {
      post.content = updatePostDto.content;
    }
    if (updatePostDto.images) {
      post.images = updatePostDto.images;
    }

    return this.postRepository.save(post);
  }

  async remove(id: number): Promise<void> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    await this.postRepository.remove(post);
  }
}
