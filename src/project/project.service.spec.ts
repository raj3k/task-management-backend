import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ProjectService', () => {
  let service: ProjectService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectService, PrismaService],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createProject', () => {
    it('should create a project', async () => {
      const mockProject = { id: 1, name: 'Test Project', description: 'Test Description' };
      jest
        .spyOn(prisma.project, 'create')
        .mockResolvedValue(mockProject as any);

      const result = await service.createProject({ name: 'Test Project', description: 'Test Description' });
      expect(result).toEqual(mockProject);
    });
  });

  describe('getProjects', () => {
    it('should return all projects', async () => {
      const mockProjects = [{ id: 1, name: 'Test Project' }];
      jest
        .spyOn(prisma.project, 'findMany')
        .mockResolvedValue(mockProjects as any);

      const result = await service.getProjects();
      expect(result).toEqual(mockProjects);
    });
  });

  describe('getProjectById', () => {
    it('should return a project by id', async () => {
      const mockProject = { id: 1, name: 'Test Project' };
      jest
        .spyOn(prisma.project, 'findUnique')
        .mockResolvedValue(mockProject as any);

      const result = await service.getProjectById(1);
      expect(result).toEqual(mockProject);
    });
  });

  describe('updateProject', () => {
    it('should update a project', async () => {
      const mockUpdatedProject = { id: 1, name: 'Updated Project' };
      jest
        .spyOn(prisma.project, 'update')
        .mockResolvedValue(mockUpdatedProject as any);

      const result = await service.updateProject(1, { name: 'Updated Project' });
      expect(result).toEqual(mockUpdatedProject);
    });
  });

  describe('deleteProject', () => {
    it('should delete a project', async () => {
      const mockDeletedProject = { id: 1, name: 'Deleted Project' };
      jest
        .spyOn(prisma.project, 'delete')
        .mockResolvedValue(mockDeletedProject as any);

      const result = await service.deleteProject(1);
      expect(result).toEqual(mockDeletedProject);
    });
  });
});
