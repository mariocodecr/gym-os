import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { CreateGymDto } from './dto/create-gym.dto';

@Injectable()
export class GymsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.gym.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const gym = await this.prisma.gym.findUnique({ where: { id } });
    if (!gym) throw new NotFoundException('Gimnasio no encontrado');
    return gym;
  }

  create(dto: CreateGymDto) {
    return this.prisma.gym.create({ data: dto });
  }

  async update(id: string, dto: Partial<CreateGymDto>) {
    await this.findOne(id);
    return this.prisma.gym.update({ where: { id }, data: dto });
  }
}
