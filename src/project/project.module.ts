import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [ProjectService, PrismaService, JwtService],
  controllers: [ProjectController],
})
export class ProjectModule {}
