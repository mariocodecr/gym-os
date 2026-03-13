import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ResultCategory } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import type { CreateResultDto } from './dto/create-result.dto';

const MEMBER_SELECT = {
  id: true,
  level: true,
  user: { select: { name: true } },
} as const;

@Injectable()
export class ResultsService {
  constructor(private readonly prisma: PrismaService) {}

  async findByWod(wodId: string, gymId: string) {
    const wod = await this.prisma.wod.findFirst({ where: { id: wodId, gymId } });
    if (!wod) throw new NotFoundException('WOD no encontrado');

    return this.prisma.wodResult.findMany({
      where: { wodId, gymId },
      include: { member: { select: MEMBER_SELECT } },
      orderBy: { createdAt: 'asc' },
    });
  }

  async leaderboard(wodId: string, gymId: string) {
    const results = await this.prisma.wodResult.findMany({
      where: { wodId, gymId },
      include: { member: { select: MEMBER_SELECT } },
    });

    const grouped: Record<ResultCategory, typeof results> = {
      rx: [],
      scaled: [],
      beginner: [],
    };

    for (const result of results) {
      grouped[result.category].push(result);
    }

    return {
      rx: grouped.rx,
      scaled: grouped.scaled,
      beginner: grouped.beginner,
    };
  }

  async create(gymId: string, dto: CreateResultDto) {
    const wod = await this.prisma.wod.findFirst({
      where: { id: dto.wodId, gymId },
    });
    if (!wod) throw new NotFoundException('WOD no encontrado');

    const member = await this.prisma.member.findFirst({
      where: { id: dto.memberId, gymId },
    });
    if (!member) throw new NotFoundException('Miembro no encontrado');

    const existing = await this.prisma.wodResult.findUnique({
      where: { wodId_memberId: { wodId: dto.wodId, memberId: dto.memberId } },
    });
    if (existing) throw new ConflictException('Ya existe un resultado para este miembro en este WOD');

    return this.prisma.wodResult.create({
      data: { ...dto, gymId },
      include: { member: { select: MEMBER_SELECT } },
    });
  }

  async update(id: string, gymId: string, dto: Partial<CreateResultDto>) {
    const result = await this.prisma.wodResult.findFirst({ where: { id, gymId } });
    if (!result) throw new NotFoundException('Resultado no encontrado');

    return this.prisma.wodResult.update({
      where: { id },
      data: dto,
      include: { member: { select: MEMBER_SELECT } },
    });
  }
}
