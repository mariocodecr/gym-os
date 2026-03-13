import { ResultCategory } from '@prisma/client';
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateResultDto {
  @IsString()
  wodId: string;

  @IsString()
  memberId: string;

  @IsString()
  @MinLength(1)
  score: string;

  @IsOptional()
  @IsEnum(ResultCategory)
  category?: ResultCategory;

  @IsOptional()
  @IsString()
  notes?: string;
}
