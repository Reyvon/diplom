import { UserRole } from "src/user/entities/user.entity";

export interface IUser {
    id: string
    email: string
    role: UserRole
    degree: string;
    due: string;
    info: string;
}
