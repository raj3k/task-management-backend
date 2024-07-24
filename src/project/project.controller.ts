import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createProject(
    @Body() body: { name: string; description?: string; projectId: number },
    @Req() req,
  ) {
    const userId = req.user.sub;
    return this.projectService.createProject({ ...body, userId });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getProjects(@Req() req) {
    const userId = req.user.sub;
    return this.projectService.getProjectByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/tasks')
  async getTasksByProject(@Param('id') projectId: number) {
    return this.projectService.getTasksByProject(projectId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getProjectById(@Param('id') id: number) {
    return this.projectService.getProjectById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateProject(
    @Param('id') id: number,
    @Body() body: { name?: string; description?: string },
  ) {
    return this.projectService.updateProject(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteProject(@Param('id') id: number) {
    return this.projectService.deleteProject(id);
  }
}
