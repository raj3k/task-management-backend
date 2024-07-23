import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('api/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  createTask(
    @Body() body: { title: string; description?: string; projectId: number },
  ) {
    return this.taskService.createTask(body);
  }

  @Get()
  getTasks() {
    return this.taskService.getTasks();
  }

  @Get(':projectId')
  getTasksByProjectID(@Param('projectId') projectId: number) {
    return this.taskService.getTasksByProjectId(projectId);
  }

  @Get(':id')
  getTaskById(@Param('id') taskId: number) {
    return this.taskService.getTaskById(taskId);
  }

  @Put(':id')
  updateTask(
    @Param('id') id: number,
    @Body() body: { title?: string; description?: string; completed?: boolean },
  ) {
    return this.taskService.updateTask(id, body);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number) {
    return this.taskService.deleteTask(id);
  }
}
