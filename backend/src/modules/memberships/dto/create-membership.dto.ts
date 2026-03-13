import { IsBoolean, IsInt, IsNumber, IsOptional, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreateMembershipDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsInt()
  @IsPositive()
  durationDays: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
