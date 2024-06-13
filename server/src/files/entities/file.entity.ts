import { User } from "src/user/entities/user.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum FileType {
    DOCS = 'docs',
    PHOTOS = 'photos',
    TRASH = 'trash',
}

@Entity()
export class FilesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    filename: string;

    @Column()
    originalname: string;

    @ManyToOne(() => User, (user) => user.files)
    user: User;

    @Column({ default: 0 })
    size: number;

    @Column()
    mimetype: string;

    @Column({ nullable: true })
    description?: string;

    @Column({ nullable: true })
    subject?: string;
    
    @DeleteDateColumn()
    deletedAt?: Date;
}
