import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from '../prisma/prisma.service';
import { Project } from '@prisma/client';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async createProject(data: {
    name: string;
    description?: string;
  }): Promise<Project> {
    return this.prisma.project.create({
      data,
    });
  }

  async getProjects(): Promise<Project[]> {
    return this.prisma.project.findMany();
  }

  async getProjectById(id: number): Promise<Project | null> {
    return this.prisma.project.findUnique({
      where: { id: Number(id) },
    });
  }

  async getTasksByProject(projectId: number) {
    const project = await this.prisma.project.findUnique({
      where: { id: Number(projectId) },
      include: { tasks: true }, // Fetch tasks associated with the project
    });

    if (!project) {
      throw new NotFoundException(`Project with id ${projectId} not found`);
    }

    return project.tasks;
  }

  async updateProject(
    id: number,
    data: { name?: string; description?: string },
  ): Promise<Project> {
    return this.prisma.project.update({
      where: { id: Number(id) },
      data,
    });
  }

  async deleteProject(id: number): Promise<Project> {
    return this.prisma.project.delete({
      where: { id: Number(id) },
    });
  }
}
