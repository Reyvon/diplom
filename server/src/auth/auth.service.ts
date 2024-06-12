import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);
    if (user && await argon2.verify(user.password, password)) {
      return user;
    }
    throw new BadRequestException('Password incorrect');
  }

  async login(user: IUser) {
    const { id, email, role, degree, due, info } = user;
    return {
      id,
      email,
      role,
      degree,
      due,
      info,
      token: this.jwtService.sign({ id: user.id, email: user.email }),
    };
  }

  async getProfile(userId: number) {
    const user = await this.userService.findById(userId);
    if (user) {
      const { password, ...userData } = user;
      return userData;
    }
    throw new NotFoundException('User not found');
  }
}
