import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { CurrentUser, Roles } from '../../common/decorators';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { CreateResultDto } from './dto/create-result.dto';
import { ResultsService } from './results.service';

interface AuthUser {
  gymId: string;
  role: UserRole;
}

@Controller('results')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Get('wod/:wodId')
  @Roles(UserRole.admin, UserRole.coach, UserRole.member)
  findByWod(@Param('wodId') wodId: string, @CurrentUser() user: AuthUser) {
    return this.resultsService.findByWod(wodId, user.gymId);
  }

  @Get('wod/:wodId/leaderboard')
  @Roles(UserRole.admin, UserRole.coach, UserRole.member)
  leaderboard(@Param('wodId') wodId: string, @CurrentUser() user: AuthUser) {
    return this.resultsService.leaderboard(wodId, user.gymId);
  }

  @Post()
  @Roles(UserRole.admin, UserRole.coach, UserRole.member)
  create(@Body() dto: CreateResultDto, @CurrentUser() user: AuthUser) {
    return this.resultsService.create(user.gymId, dto);
  }

  @Patch(':id')
  @Roles(UserRole.admin, UserRole.coach)
  update(
    @Param('id') id: string,
    @Body() dto: Partial<CreateResultDto>,
    @CurrentUser() user: AuthUser,
  ) {
    return this.resultsService.update(id, user.gymId, dto);
  }
}
