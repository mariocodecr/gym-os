import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { CurrentUser, Roles } from '../../common/decorators';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

interface AuthUser {
  id: string;
  gymId: string;
  role: UserRole;
}

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(UserRole.admin)
  findAll(@CurrentUser() user: AuthUser) {
    return this.usersService.findAll(user.gymId);
  }

  @Get(':id')
  @Roles(UserRole.admin)
  findOne(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.usersService.findOne(id, user.gymId);
  }

  @Patch(':id')
  @Roles(UserRole.admin)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.usersService.update(id, user.gymId, dto);
  }
}
