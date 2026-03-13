import { PaymentMethod, PaymentStatus } from '@prisma/client';
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  memberId: string;

  @IsString()
  membershipId: string;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsDateString()
  dueDate: string;

  @IsOptional()
  @IsEnum(PaymentMethod)
  method?: PaymentMethod;

  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}
