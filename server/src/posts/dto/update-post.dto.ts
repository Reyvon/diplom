import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateNewsPostDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsNumber()
  userId?: number; 
}
