import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { CurrentUser, Roles } from '../../common/decorators';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { CreateGymDto } from './dto/create-gym.dto';
import { GymsService } from './gyms.service';

interface AuthUser {
  id: string;
  gymId: string;
  role: UserRole;
}

@Controller('gyms')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GymsController {
  constructor(private readonly gymsService: GymsService) {}

  @Get()
  @Roles(UserRole.admin)
  findAll() {
    return this.gymsService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.admin)
  findOne(@Param('id') id: string) {
    return this.gymsService.findOne(id);
  }

  @Post()
  @Roles(UserRole.admin)
  create(@Body() dto: CreateGymDto) {
    return this.gymsService.create(dto);
  }

  @Patch(':id')
  @Roles(UserRole.admin)
  update(@Param('id') id: string, @Body() dto: Partial<CreateGymDto>) {
    return this.gymsService.update(id, dto);
  }
}
