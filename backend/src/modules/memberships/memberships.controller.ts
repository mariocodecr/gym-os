import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { CurrentUser, Roles } from '../../common/decorators';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { MembershipsService } from './memberships.service';

interface AuthUser {
  gymId: string;
  role: UserRole;
}

@Controller('memberships')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MembershipsController {
  constructor(private readonly membershipsService: MembershipsService) {}

  @Get()
  @Roles(UserRole.admin, UserRole.coach)
  findAll(@CurrentUser() user: AuthUser) {
    return this.membershipsService.findAll(user.gymId);
  }

  @Get(':id')
  @Roles(UserRole.admin, UserRole.coach)
  findOne(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.membershipsService.findOne(id, user.gymId);
  }

  @Post()
  @Roles(UserRole.admin)
  create(@Body() dto: CreateMembershipDto, @CurrentUser() user: AuthUser) {
    return this.membershipsService.create(user.gymId, dto);
  }

  @Patch(':id')
  @Roles(UserRole.admin)
  update(
    @Param('id') id: string,
    @Body() dto: Partial<CreateMembershipDto>,
    @CurrentUser() user: AuthUser,
  ) {
    return this.membershipsService.update(id, user.gymId, dto);
  }
}
