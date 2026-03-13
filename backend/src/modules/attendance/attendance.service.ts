import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AttendanceService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(gymId: string) {
    return this.prisma.attendance.findMany({
      where: { gymId },
      include: {
        member: { include: { user: { select: { name: true } } } },
      },
      orderBy: { checkinTime: 'desc' },
      take: 100,
    });
  }

  async checkin(gymId: string, memberId: string) {
    const member = await this.prisma.member.findFirst({
      where: { id: memberId, gymId },
    });

    if (!member) throw new NotFoundException('Miembro no encontrado');

    const hasActivePayment = await this.prisma.payment.findFirst({
      where: {
        memberId,
        gymId,
        status: 'paid',
        dueDate: { gte: new Date() },
      },
    });

    if (!hasActivePayment) {
      throw new BadRequestException('El miembro no tiene una membresía activa');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const alreadyCheckedIn = await this.prisma.attendance.findUnique({
      where: {
        gymId_memberId_checkinDate: {
          gymId,
          memberId,
          checkinDate: today,
        },
      },
    });

    if (alreadyCheckedIn) {
      throw new ConflictException('El miembro ya registró asistencia hoy');
    }

    return this.prisma.attendance.create({
      data: { gymId, memberId, checkinDate: today },
      include: {
        member: { include: { user: { select: { name: true } } } },
      },
    });
  }

  checkinByQr(gymId: string, qrCode: string) {
    return this.prisma.member
      .findFirst({ where: { qrCode, gymId } })
      .then((member) => {
        if (!member) throw new NotFoundException('QR inválido');
        return this.checkin(gymId, member.id);
      });
  }
}
