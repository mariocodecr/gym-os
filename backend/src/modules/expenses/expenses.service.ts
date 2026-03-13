import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { CreateExpenseDto } from './dto/create-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(gymId: string) {
    return this.prisma.expense.findMany({
      where: { gymId },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: string, gymId: string) {
    const expense = await this.prisma.expense.findFirst({ where: { id, gymId } });
    if (!expense) throw new NotFoundException('Gasto no encontrado');
    return expense;
  }

  create(gymId: string, dto: CreateExpenseDto) {
    return this.prisma.expense.create({
      data: {
        ...dto,
        gymId,
        date: dto.date ? new Date(dto.date) : undefined,
      },
    });
  }

  async remove(id: string, gymId: string) {
    await this.findOne(id, gymId);
    return this.prisma.expense.delete({ where: { id } });
  }
}
