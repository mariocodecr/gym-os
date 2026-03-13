import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as QRCode from 'qrcode';
import { PrismaService } from '../../prisma/prisma.service';
import type { CreateMemberDto } from './dto/create-member.dto';

@Injectable()
export class MembersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  findAll(gymId: string) {
    return this.prisma.member.findMany({
      where: { gymId },
      include: { user: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, gymId: string) {
    const member = await this.prisma.member.findFirst({
      where: { id, gymId },
      include: { user: { select: { name: true, email: true, role: true } } },
    });

    if (!member) throw new NotFoundException('Miembro no encontrado');
    return member;
  }

  create(gymId: string, dto: CreateMemberDto) {
    return this.prisma.member.create({
      data: { ...dto, gymId },
      include: { user: { select: { name: true, email: true } } },
    });
  }

  async update(id: string, gymId: string, dto: Partial<CreateMemberDto>) {
    await this.findOne(id, gymId);
    return this.prisma.member.update({
      where: { id },
      data: dto,
      include: { user: { select: { name: true, email: true } } },
    });
  }

  async getQrCode(id: string, gymId: string): Promise<string> {
    const member = await this.findOne(id, gymId);

    const frontendUrl = this.config.get<string>(
      'FRONTEND_URL',
      'http://localhost:3001',
    );
    const checkinUrl = `${frontendUrl}/checkin/${member.qrCode}`;

    return QRCode.toDataURL(checkinUrl, {
      errorCorrectionLevel: 'H',
      width: 300,
      margin: 2,
    });
  }
}
