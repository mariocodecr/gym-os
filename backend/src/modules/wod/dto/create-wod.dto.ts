import { WodType } from '@prisma/client';
import { IsDateString, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateWodDto {
  @IsString()
  @MinLength(2)
  title: string;

  @IsString()
  @MinLength(10)
  description: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsEnum(WodType)
  type?: WodType;
}
