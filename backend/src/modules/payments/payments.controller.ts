import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { CurrentUser, Roles } from '../../common/decorators';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentsService } from './payments.service';

interface AuthUser {
  gymId: string;
  role: UserRole;
}

@Controller('payments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  @Roles(UserRole.admin)
  findAll(@CurrentUser() user: AuthUser) {
    return this.paymentsService.findAll(user.gymId);
  }

  @Get('member/:memberId')
  @Roles(UserRole.admin)
  findByMember(@Param('memberId') memberId: string, @CurrentUser() user: AuthUser) {
    return this.paymentsService.findByMember(memberId, user.gymId);
  }

  @Post()
  @Roles(UserRole.admin)
  create(@Body() dto: CreatePaymentDto, @CurrentUser() user: AuthUser) {
    return this.paymentsService.create(user.gymId, dto);
  }
}
