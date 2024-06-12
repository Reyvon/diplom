import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  degree?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  due?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  info?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  fullName?: {
    firstName?: string;
    secondName?: string;
    surName?: string;
  };
}