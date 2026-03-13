import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { CurrentUser, Roles } from '../../common/decorators';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { ExpensesService } from './expenses.service';

interface AuthUser {
  gymId: string;
  role: UserRole;
}

@Controller('expenses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  @Roles(UserRole.admin)
  findAll(@CurrentUser() user: AuthUser) {
    return this.expensesService.findAll(user.gymId);
  }

  @Post()
  @Roles(UserRole.admin)
  create(@Body() dto: CreateExpenseDto, @CurrentUser() user: AuthUser) {
    return this.expensesService.create(user.gymId, dto);
  }

  @Delete(':id')
  @Roles(UserRole.admin)
  remove(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.expensesService.remove(id, user.gymId);
  }
}
