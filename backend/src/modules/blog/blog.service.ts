import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { CreateBlogPostDto } from './dto/create-blog-post.dto';

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(gymId: string) {
    return this.prisma.blogPost.findMany({
      where: { gymId, published: true },
      select: {
        id: true,
        title: true,
        slug: true,
        coverImage: true,
        publishedAt: true,
        author: { select: { name: true } },
      },
      orderBy: { publishedAt: 'desc' },
    });
  }

  findAllAdmin(gymId: string) {
    return this.prisma.blogPost.findMany({
      where: { gymId },
      select: {
        id: true,
        title: true,
        slug: true,
        published: true,
        publishedAt: true,
        coverImage: true,
        author: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findBySlug(slug: string, gymId: string) {
    const post = await this.prisma.blogPost.findUnique({
      where: { gymId_slug: { gymId, slug } },
      include: { author: { select: { name: true } } },
    });

    if (!post) throw new NotFoundException('Post no encontrado');
    return post;
  }

  async create(gymId: string, authorId: string, dto: CreateBlogPostDto) {
    const baseSlug = toSlug(dto.title);

    const existing = await this.prisma.blogPost.findUnique({
      where: { gymId_slug: { gymId, slug: baseSlug } },
    });

    const slug = existing ? `${baseSlug}-${Date.now()}` : baseSlug;
    const publishedAt = dto.published ? new Date() : null;

    return this.prisma.blogPost.create({
      data: { ...dto, gymId, authorId, slug, publishedAt },
      include: { author: { select: { name: true } } },
    });
  }

  async update(id: string, gymId: string, dto: Partial<CreateBlogPostDto>) {
    const post = await this.prisma.blogPost.findFirst({ where: { id, gymId } });
    if (!post) throw new NotFoundException('Post no encontrado');

    const publishedAt =
      dto.published && !post.published ? new Date() : post.publishedAt;

    return this.prisma.blogPost.update({
      where: { id },
      data: { ...dto, publishedAt },
      include: { author: { select: { name: true } } },
    });
  }

  async remove(id: string, gymId: string) {
    const post = await this.prisma.blogPost.findFirst({ where: { id, gymId } });
    if (!post) throw new NotFoundException('Post no encontrado');
    return this.prisma.blogPost.delete({ where: { id } });
  }
}
