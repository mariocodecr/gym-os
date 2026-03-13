import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateGymDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  whatsapp?: string;

  @IsOptional()
  @IsString()
  logoUrl?: string;
}
