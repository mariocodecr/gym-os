import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { CurrentUser, Roles } from '../../common/decorators';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { AttendanceService } from './attendance.service';
import { CheckinDto } from './dto/checkin.dto';

interface AuthUser {
  gymId: string;
  role: UserRole;
}

@Controller('attendance')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get()
  @Roles(UserRole.admin, UserRole.coach)
  findAll(@CurrentUser() user: AuthUser) {
    return this.attendanceService.findAll(user.gymId);
  }

  @Post('checkin')
  @Roles(UserRole.admin, UserRole.coach)
  checkin(@Body() dto: CheckinDto, @CurrentUser() user: AuthUser) {
    return this.attendanceService.checkin(user.gymId, dto.memberId);
  }

  @Post('checkin/qr/:qrCode')
  checkinByQr(@Param('qrCode') qrCode: string, @CurrentUser() user: AuthUser) {
    return this.attendanceService.checkinByQr(user.gymId, qrCode);
  }
}
