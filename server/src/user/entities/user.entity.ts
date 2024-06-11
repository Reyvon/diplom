import { FilesEntity } from "src/files/entities/file.entity";
import { NewsPost } from "src/posts/entities/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


export enum UserRole {
    ADMIN = 'admin',
    STUDENT = 'student',
    TEACHER = 'teacher',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.STUDENT,
      })
      role: UserRole;

    @OneToMany(() => FilesEntity, (file) => file.user)
    files: FilesEntity[]

    @OneToMany(() => NewsPost, (post) => post.user)
  posts: NewsPost[];
}
