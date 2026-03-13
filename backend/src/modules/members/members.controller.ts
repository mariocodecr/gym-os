import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { CurrentUser, Roles } from '../../common/decorators';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { CreateMemberDto } from './dto/create-member.dto';
import { MembersService } from './members.service';

interface AuthUser {
  id: string;
  gymId: string;
  role: UserRole;
}

@Controller('members')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  @Roles(UserRole.admin, UserRole.coach)
  findAll(@CurrentUser() user: AuthUser) {
    return this.membersService.findAll(user.gymId);
  }

  @Get(':id')
  @Roles(UserRole.admin, UserRole.coach)
  findOne(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.membersService.findOne(id, user.gymId);
  }

  @Post()
  @Roles(UserRole.admin)
  create(@Body() dto: CreateMemberDto, @CurrentUser() user: AuthUser) {
    return this.membersService.create(user.gymId, dto);
  }

  @Patch(':id')
  @Roles(UserRole.admin)
  update(
    @Param('id') id: string,
    @Body() dto: Partial<CreateMemberDto>,
    @CurrentUser() user: AuthUser,
  ) {
    return this.membersService.update(id, user.gymId, dto);
  }
}
