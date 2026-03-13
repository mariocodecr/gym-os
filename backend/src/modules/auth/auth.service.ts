import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { PrismaService } from '../../prisma/prisma.service';
import type { LoginDto } from './dto/login.dto';
import type { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { gymId_email: { gymId: dto.gymId, email: dto.email } },
    });

    if (existing) throw new ConflictException('Email ya registrado en este gimnasio');

    const passwordHash = await hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        gymId: dto.gymId,
        name: dto.name,
        email: dto.email,
        passwordHash,
        role: dto.role,
      },
      select: { id: true, name: true, email: true, role: true, gymId: true },
    });

    return this.buildTokenResponse(user);
  }

  async login(dto: LoginDto, gymId: string) {
    const user = await this.prisma.user.findUnique({
      where: { gymId_email: { gymId, email: dto.email } },
    });

    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const valid = await compare(dto.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Credenciales inválidas');

    return this.buildTokenResponse({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      gymId: user.gymId,
    });
  }

  private buildTokenResponse(user: {
    id: string;
    name: string;
    email: string;
    role: string;
    gymId: string;
  }) {
    const payload = {
      sub: user.id,
      email: user.email,
      gymId: user.gymId,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }
}
