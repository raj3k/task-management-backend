import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('api/projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  createProject(@Body() body: { name: string; description?: string }) {
    return this.projectService.createProject(body);
  }

  @Get()
  getProjects() {
    return this.projectService.getProjects();
  }

  @Get(':id/tasks')
  async getTasksByProject(@Param('id') projectId: number) {
    return this.projectService.getTasksByProject(projectId);
  }

  @Get(':id')
  getProjectById(@Param('id') id: number) {
    return this.projectService.getProjectById(id);
  }

  @Put(':id')
  updateProject(
    @Param('id') id: number,
    @Body() body: { name?: string; description?: string },
  ) {
    return this.projectService.updateProject(id, body);
  }

  @Delete(':id')
  deleteProject(@Param('id') id: number) {
    return this.projectService.deleteProject(id);
  }
}
