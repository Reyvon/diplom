import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FilesModule } from './files/files.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { FilesEntity } from './files/entities/file.entity';
import { User } from './user/entities/user.entity';
import { Auth } from './auth/entities/auth.entity';
import { PostEntity } from './posts/entities/post.entity';
import { PostModule } from './posts/posts.module';
import { Fullname } from './user/entities/fullname.entity';


@Module({
  imports: [
    UserModule, 
    FilesModule, 
    ConfigModule.forRoot({isGlobal: true}), 
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        entities: [FilesEntity, User, Auth, PostEntity, Fullname],
      }),
      inject: [ConfigService]
    }), AuthModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
