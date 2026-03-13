import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { CurrentUser, Roles } from '../../common/decorators';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { CreateWodDto } from './dto/create-wod.dto';
import { WodsService } from './wods.service';

interface AuthUser {
  gymId: string;
  role: UserRole;
}

@Controller('wods')
@UseGuards(JwtAuthGuard, RolesGuard)
export class WodsController {
  constructor(private readonly wodsService: WodsService) {}

  @Get()
  @Roles(UserRole.admin, UserRole.coach, UserRole.member)
  findAll(@CurrentUser() user: AuthUser) {
    return this.wodsService.findAll(user.gymId);
  }

  @Get('today')
  @Roles(UserRole.admin, UserRole.coach, UserRole.member)
  findToday(@CurrentUser() user: AuthUser) {
    return this.wodsService.findToday(user.gymId);
  }

  @Get(':id')
  @Roles(UserRole.admin, UserRole.coach, UserRole.member)
  findOne(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.wodsService.findOne(id, user.gymId);
  }

  @Post()
  @Roles(UserRole.admin, UserRole.coach)
  create(@Body() dto: CreateWodDto, @CurrentUser() user: AuthUser) {
    return this.wodsService.create(user.gymId, dto);
  }

  @Patch(':id')
  @Roles(UserRole.admin, UserRole.coach)
  update(
    @Param('id') id: string,
    @Body() dto: Partial<CreateWodDto>,
    @CurrentUser() user: AuthUser,
  ) {
    return this.wodsService.update(id, user.gymId, dto);
  }

  @Delete(':id')
  @Roles(UserRole.admin)
  remove(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.wodsService.remove(id, user.gymId);
  }
}
