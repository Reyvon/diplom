import { Module } from '@nestjs/common';
import { NewsService } from './posts.service';
import { NewsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsPost } from './entities/post.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([NewsPost]),UserModule,],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}