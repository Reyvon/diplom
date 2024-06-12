import { FilesEntity } from "src/files/entities/file.entity";
import { PostEntity } from "src/posts/entities/post.entity";
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

    @OneToMany(() => PostEntity, post => post.user)
  posts: PostEntity[];
   
    @Column({default: null})
    degree: string;

    @Column({default: null})
    due: string;

    @Column({default: null})
    info: string;
}
