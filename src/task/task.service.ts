import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async createTask(data: {
    title: string;
    description?: string;
    projectId: number;
  }): Promise<Task> {
    return this.prisma.task.create({
      data,
    });
  }

  async getTaskById(id: number): Promise<Task> {
    return this.prisma.task.findUnique({
      where: { id: Number(id) },
    });
  }

  async getTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async getTasksByProjectId(projectId: number): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: { id: Number(projectId) },
    });
  }

  async updateTask(
    id: number,
    data: { title?: string; description?: string; completed?: boolean },
  ): Promise<Task> {
    return this.prisma.task.update({
      where: { id: Number(id) },
      data,
    });
  }

  async deleteTask(id: number): Promise<Task> {
    return this.prisma.task.delete({
      where: { id: Number(id) },
    });
  }
}
