import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const mockUser: User = {
        id: 1,
        email: 'test@test.com',
        password: 'hashed',
        name: 'Test User',
      };

      jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce('hashed' as never);
      jest.spyOn(prisma.user, 'create').mockResolvedValueOnce(mockUser);

      const result = await service.createUser(
        'test@test.com',
        'password',
        'Test User',
      );
      expect(result).toEqual(mockUser);
      expect(bcrypt.hash).toHaveBeenCalledWith('password', 10);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          email: 'test@test.com',
          password: 'hashed',
          name: 'Test User',
        },
      });
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      const mockUser: User = {
        id: 1,
        email: 'test@test.com',
        password: 'hashed',
        name: 'Test User',
      };

      jest.spyOn(prisma.user, 'findUnique').mockResolvedValueOnce(mockUser);

      const result = await service.findByEmail('test@test.com');
      expect(result).toEqual(mockUser);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@test.com' },
      });
    });
  });

  describe('validateUser', () => {
    it('should validate a user and return the user without password', async () => {
      const mockUser: User = {
        id: 1,
        email: 'test@test.com',
        password: 'hashed',
        name: 'Test User',
      };

      jest.spyOn(prisma.user, 'findUnique').mockResolvedValueOnce(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true as never);

      const result = await service.validateUser('test@test.com', 'password');
      expect(result).toEqual(mockUser);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@test.com' },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'password',
        mockUser.password,
      );
    });

    it('should return null if user not found', async () => {
      const mockUser: User = {
        id: 1,
        email: 'test@test.com',
        password: 'hashed',
        name: 'Test User',
      };

      jest.spyOn(prisma.user, 'findUnique').mockResolvedValueOnce(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false as never);
      const result = await service.validateUser('test@test.com', 'password');
      expect(result).toBeNull();
    });
  });
});
