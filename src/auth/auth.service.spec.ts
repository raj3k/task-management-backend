import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            validateUser: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should validate and return a user', async () => {
      const mockUser: User = {
        id: 1,
        email: 'test@test.com',
        password: 'hashed',
        name: 'Test User',
      };

      const expectedUser = {
        email: 'test@test.com',
        id: 1,
        name: 'Test User',
      };

      jest.spyOn(userService, 'validateUser').mockResolvedValueOnce(mockUser);

      const result = await service.validateUser('test@test.com', 'password');
      expect(result).toEqual(expectedUser);
      expect(userService.validateUser).toHaveBeenCalledWith(
        'test@test.com',
        'password',
      );
    });
  });

  describe('login', () => {
    it('should return a JWT token', async () => {
      const mockUser = {
        id: 1,
        email: 'test@test.com',
      };
      const mockToken = 'jwt-token';

      jest.spyOn(jwtService, 'sign').mockReturnValueOnce(mockToken);

      const result = await service.login(mockUser);
      expect(result).toEqual({ access_token: mockToken });
      expect(jwtService.sign).toHaveBeenCalledWith({
        email: 'test@test.com',
        sub: 1,
      });
    });
  });
});
