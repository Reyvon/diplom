import { Controller, Get, Post, Body, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, UseGuards, Query, Param } from '@nestjs/common';
import { FilesService } from './files.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileStorage } from './storage';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserId } from 'src/types/user-id.decorator';
import { FileType } from './entities/file.entity';

@Controller('files')
@ApiTags('files')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get()
  findAll(@UserId() userId: number, @Query('type') fileType: FileType) {
    return this.filesService.findAll(userId, fileType);
  }

  @Get('all')
  findAllFiles() {
    return this.filesService.findAllFiles();
  }
  
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: fileStorage
    })
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        description: {
          type: 'string',
        },
        subject: {
          type: 'string',
        }
      }
    }
  })
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 })],
      }),
    ) file: Express.Multer.File,
    @UserId() userId: number,
    @Body('description') description: string,
    @Body('subject') subject: string,
  ) {
    return this.filesService.create(file, userId, description, subject);
  }

  @Delete()
  remove(@UserId() userId: number, @Query('ids') ids: string) {
    // files?ids=1,2,3,4
    return this.filesService.remove(userId, ids);
  }

  @Delete(':id')
  removeById(@Param('id') id: number) {
    return this.filesService.removeById(id);
  }
}
