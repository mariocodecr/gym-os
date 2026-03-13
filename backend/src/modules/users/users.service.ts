import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(gymId: string) {
    return this.prisma.user.findMany({
      where: { gymId },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string, gymId: string) {
    const user = await this.prisma.user.findFirst({
      where: { id, gymId },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async update(id: string, gymId: string, dto: UpdateUserDto) {
    await this.findOne(id, gymId);
    return this.prisma.user.update({
      where: { id },
      data: dto,
      select: { id: true, name: true, email: true, role: true },
    });
  }
}
