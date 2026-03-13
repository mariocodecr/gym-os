import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats(gymId: string) {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalMembers,
      activePayments,
      monthlyRevenue,
      monthlyExpenses,
      attendanceToday,
      wodsThisMonth,
      recentAttendance,
      recentPayments,
    ] = await Promise.all([
      this.prisma.member.count({ where: { gymId } }),

      this.prisma.payment.count({
        where: { gymId, status: 'paid', dueDate: { gte: now } },
      }),

      this.prisma.payment.aggregate({
        where: { gymId, status: 'paid', paymentDate: { gte: startOfMonth } },
        _sum: { amount: true },
      }),

      this.prisma.expense.aggregate({
        where: { gymId, date: { gte: startOfMonth } },
        _sum: { amount: true },
      }),

      this.prisma.attendance.count({ where: { gymId, checkinDate: today } }),

      this.prisma.wod.count({
        where: { gymId, date: { gte: startOfMonth } },
      }),

      this.prisma.attendance.findMany({
        where: { gymId },
        include: { member: { include: { user: { select: { name: true } } } } },
        orderBy: { checkinTime: 'desc' },
        take: 5,
      }),

      this.prisma.payment.findMany({
        where: { gymId },
        include: {
          member: { include: { user: { select: { name: true } } } },
          membership: { select: { name: true } },
        },
        orderBy: { paymentDate: 'desc' },
        take: 5,
      }),
    ]);

    const revenue = monthlyRevenue._sum.amount ?? 0;
    const expenses = monthlyExpenses._sum.amount ?? 0;

    return {
      totalMembers,
      activeMembers: activePayments,
      monthlyRevenue: revenue,
      monthlyExpenses: expenses,
      monthlyProfit: revenue - expenses,
      attendanceToday,
      wodsThisMonth,
      recentAttendance,
      recentPayments,
    };
  }
}
