import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { PrismaService } from '../prisma/prisma.service';

describe('TaskService', () => {
  let service: TaskService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService, PrismaService],
    }).compile();

    service = module.get<TaskService>(TaskService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTask', () => {
    it('should create a task', async () => {
      const mockTask = { id: 1, title: 'Test Task', projectId: 1 };
      jest.spyOn(prisma.task, 'create').mockResolvedValue(mockTask as any);

      const result = await service.createTask({
        title: 'Test Task',
        projectId: 1,
      });
      expect(result).toEqual(mockTask);
    });
  });

  describe('getTasks', () => {
    it('should return all tasks', async () => {
      const mockTasks = [{ id: 1, title: 'Test Task' }];
      jest.spyOn(prisma.task, 'findMany').mockResolvedValue(mockTasks as any);

      const result = await service.getTasks();
      expect(result).toEqual(mockTasks);
    });
  });

  describe('getTaskById', () => {
    it('should return a task by id', async () => {
      const mockTask = { id: 1, title: 'Test Task' };
      jest.spyOn(prisma.task, 'findUnique').mockResolvedValue(mockTask as any);

      const result = await service.getTaskById(1);
      expect(result).toEqual(mockTask);
    });
  });

  describe('updateTask', () => {
    it('should update a task', async () => {
      const mockUpdatedTask = { id: 1, title: 'Updated Task' };
      jest
        .spyOn(prisma.task, 'update')
        .mockResolvedValue(mockUpdatedTask as any);

      const result = await service.updateTask(1, { title: 'Updated Task' });
      expect(result).toEqual(mockUpdatedTask);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      const mockDeletedTask = { id: 1, title: 'Deleted Task' };
      jest
        .spyOn(prisma.task, 'delete')
        .mockResolvedValue(mockDeletedTask as any);

      const result = await service.deleteTask(1);
      expect(result).toEqual(mockDeletedTask);
    });
  });
});
