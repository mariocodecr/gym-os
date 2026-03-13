import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { CreateWodDto } from './dto/create-wod.dto';

@Injectable()
export class WodsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(gymId: string) {
    return this.prisma.wod.findMany({
      where: { gymId },
      include: { _count: { select: { results: true } } },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: string, gymId: string) {
    const wod = await this.prisma.wod.findFirst({
      where: { id, gymId },
      include: { _count: { select: { results: true } } },
    });

    if (!wod) throw new NotFoundException('WOD no encontrado');
    return wod;
  }

  findToday(gymId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.prisma.wod.findFirst({
      where: { gymId, date: today },
      include: { _count: { select: { results: true } } },
    });
  }

  create(gymId: string, dto: CreateWodDto) {
    return this.prisma.wod.create({
      data: {
        ...dto,
        gymId,
        date: dto.date ? new Date(dto.date) : undefined,
      },
    });
  }

  async update(id: string, gymId: string, dto: Partial<CreateWodDto>) {
    await this.findOne(id, gymId);
    return this.prisma.wod.update({
      where: { id },
      data: {
        ...dto,
        date: dto.date ? new Date(dto.date) : undefined,
      },
    });
  }

  async remove(id: string, gymId: string) {
    await this.findOne(id, gymId);
    return this.prisma.wod.delete({ where: { id } });
  }
}
