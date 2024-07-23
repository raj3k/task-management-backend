import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [AuthModule, UserModule, ProjectModule, TaskModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
