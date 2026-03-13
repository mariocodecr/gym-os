import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(gymId: string) {
    return this.prisma.payment.findMany({
      where: { gymId },
      include: {
        member: { include: { user: { select: { name: true } } } },
        membership: { select: { name: true } },
      },
      orderBy: { paymentDate: 'desc' },
    });
  }

  findByMember(memberId: string, gymId: string) {
    return this.prisma.payment.findMany({
      where: { memberId, gymId },
      include: { membership: { select: { name: true, durationDays: true } } },
      orderBy: { paymentDate: 'desc' },
    });
  }

  create(gymId: string, dto: CreatePaymentDto) {
    return this.prisma.payment.create({
      data: { ...dto, gymId, dueDate: new Date(dto.dueDate) },
      include: {
        member: { include: { user: { select: { name: true } } } },
        membership: { select: { name: true } },
      },
    });
  }
}
