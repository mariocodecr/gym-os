import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { CreateMembershipDto } from './dto/create-membership.dto';

@Injectable()
export class MembershipsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(gymId: string) {
    return this.prisma.membership.findMany({
      where: { gymId },
      orderBy: { price: 'asc' },
    });
  }

  async findOne(id: string, gymId: string) {
    const membership = await this.prisma.membership.findFirst({
      where: { id, gymId },
    });

    if (!membership) throw new NotFoundException('Membresía no encontrada');
    return membership;
  }

  create(gymId: string, dto: CreateMembershipDto) {
    return this.prisma.membership.create({ data: { ...dto, gymId } });
  }

  async update(id: string, gymId: string, dto: Partial<CreateMembershipDto>) {
    await this.findOne(id, gymId);
    return this.prisma.membership.update({ where: { id }, data: dto });
  }
}
