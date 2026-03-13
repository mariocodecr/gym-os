import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { CurrentUser, Roles } from '../../common/decorators';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { BlogService } from './blog.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';

interface AuthUser {
  id: string;
  gymId: string;
  role: UserRole;
}

@Controller('blog')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  @Roles(UserRole.admin, UserRole.coach, UserRole.member)
  findAll(@CurrentUser() user: AuthUser) {
    return this.blogService.findAll(user.gymId);
  }

  @Get('admin')
  @Roles(UserRole.admin)
  findAllAdmin(@CurrentUser() user: AuthUser) {
    return this.blogService.findAllAdmin(user.gymId);
  }

  @Get(':slug')
  @Roles(UserRole.admin, UserRole.coach, UserRole.member)
  findBySlug(@Param('slug') slug: string, @CurrentUser() user: AuthUser) {
    return this.blogService.findBySlug(slug, user.gymId);
  }

  @Post()
  @Roles(UserRole.admin)
  create(@Body() dto: CreateBlogPostDto, @CurrentUser() user: AuthUser) {
    return this.blogService.create(user.gymId, user.id, dto);
  }

  @Patch(':id')
  @Roles(UserRole.admin)
  update(
    @Param('id') id: string,
    @Body() dto: Partial<CreateBlogPostDto>,
    @CurrentUser() user: AuthUser,
  ) {
    return this.blogService.update(id, user.gymId, dto);
  }

  @Delete(':id')
  @Roles(UserRole.admin)
  remove(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.blogService.remove(id, user.gymId);
  }
}
