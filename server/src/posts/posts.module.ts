import { Module, Post } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { PostService } from './posts.service';
import { PostController } from './posts.controller';
import { PostEntity } from './entities/post.entity';


@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, User])],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
