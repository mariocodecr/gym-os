import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { GymsModule } from './modules/gyms/gyms.module';
import { MembersModule } from './modules/members/members.module';
import { MembershipsModule } from './modules/memberships/memberships.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ExpensesModule } from './modules/expenses/expenses.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { WodsModule } from './modules/wod/wods.module';
import { ResultsModule } from './modules/results/results.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    GymsModule,
    MembersModule,
    MembershipsModule,
    PaymentsModule,
    ExpensesModule,
    AttendanceModule,
    WodsModule,
    ResultsModule,
  ],
})
export class AppModule {}
