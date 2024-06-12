import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Fullname {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: null})
    firstName: string;

    @Column({default: null})
    secondName: string;

    @Column({default: null})
    surName: string;
}