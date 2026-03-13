import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { CurrentUser, Roles } from '../../common/decorators';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { DashboardService } from './dashboard.service';

interface AuthUser {
  gymId: string;
  role: UserRole;
}

@Controller('dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @Roles(UserRole.admin)
  getStats(@CurrentUser() user: AuthUser) {
    return this.dashboardService.getStats(user.gymId);
  }
}
