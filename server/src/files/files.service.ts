import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileType, FilesEntity } from './entities/file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FilesEntity)
    private repository: Repository<FilesEntity>
  ) {}

  findAll(userId: number, fileType: FileType) {
    const qb = this.repository.createQueryBuilder('file');
    
    qb.leftJoinAndSelect('file.user', 'user')
      .where('file.userId = :userId', { userId });

    if (fileType === FileType.PHOTOS) {
      qb.andWhere('file.mimetype ILIKE :type', { type: '%image%' });
    }

    if (fileType === FileType.DOCS) {
      qb.andWhere('file.mimetype ILIKE :type', { type: '%application%' });
    }

    if (fileType === FileType.TRASH) {
      qb.withDeleted().andWhere('file.deletedAt IS NOT NULL');
    }

    return qb.getMany();
  }

  findAllFiles() {
    return this.repository.find();
  }
  
  create(file: Express.Multer.File, userId: number, description?: string) {
    return this.repository.save({
      filename: file.filename,
      originalname: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      user: { id: userId },
      description,
    });
  }
  
  async remove(userId: number, ids: string) {
    const idsArray = ids.split(',');

    const qb = this.repository.createQueryBuilder('file');

    qb.where('id IN (:...ids) AND userId = :userId', {
      ids: idsArray,
      userId,
    });

    return qb.softDelete().execute();
  }
}
