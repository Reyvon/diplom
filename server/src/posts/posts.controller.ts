import { Controller, Get, Post as HttpPost, Body, Param, Patch, Delete } from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './posts.service';
import { PostEntity } from './entities/post.entity';


@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @HttpPost()
  create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<PostEntity> {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto): Promise<PostEntity> {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.postService.remove(id);
  }
}
