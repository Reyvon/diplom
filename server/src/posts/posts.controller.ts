
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CreateNewsPostDto } from './dto/create-post.dto';
import { UpdateNewsPostDto } from './dto/update-post.dto';
import { NewsService } from './posts.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  create(@Body() createNewsPostDto: CreateNewsPostDto) {
    return this.newsService.create(createNewsPostDto);
  }

  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.newsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateNewsPostDto: UpdateNewsPostDto) {
    return this.newsService.update(id, updateNewsPostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.newsService.remove(id);
  }
}
