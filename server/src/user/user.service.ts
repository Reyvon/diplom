import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { Fullname } from './entities/fullname.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Fullname) private readonly fullNameRepository: Repository<Fullname>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existUser) throw new BadRequestException('This email already exists');

    const user = await this.userRepository.save({
      email: createUserDto.email,
      password: await argon2.hash(createUserDto.password),
    });

    const token = this.jwtService.sign({ email: createUserDto.email });
    return { user, token };
  }

  async findOne(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async findById(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['fullName'],
    });
  }

  async findAllTeachers(): Promise<User[]> {
    return await this.userRepository.find({
      where: { role: UserRole.TEACHER },
    });
  }

  async findAllStudents(): Promise<User[]> {
    return await this.userRepository.find({
      where: { role: UserRole.STUDENT },
    });
  }


  async findTeacherById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id, role: UserRole.TEACHER },
      relations: ['fullName'],
    });
    if (!user) {
      throw new NotFoundException(`Teacher with id ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found');

    if (updateUserDto.fullName) {
      let fullName = user.fullName;
      if (!fullName) {
        fullName = new Fullname();
        fullName = await this.fullNameRepository.save(fullName);
        user.fullName = fullName;
      }

      Object.assign(fullName, updateUserDto.fullName);
      await this.fullNameRepository.save(fullName);
    }

    delete updateUserDto.fullName;
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }
}
