import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { WodsController } from './wods.controller';
import { WodsService } from './wods.service';

@Module({
  imports: [PrismaModule],
  controllers: [WodsController],
  providers: [WodsService],
})
export class WodsModule {}
