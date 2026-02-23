import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { UsersController } from '../../../src/users/users.controller';
import { UsersService } from '../../../src/users/users.service';
import { LoginService } from '../../../src/login/login.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('User Controller Unit Test', () => {
  let controller: UsersController;
  let service: UsersService;
  let loginService: LoginService;
  let module: TestingModule;

  beforeEach(async () => {
    const userServiceMock = {
      create: jest.fn(),
      findAll: jest.fn(),
      findByCode: jest.fn(),
    };

    const loginServiceMock = {
      login: jest.fn(),
    };

    module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: userServiceMock },
        { provide: LoginService, useValue: loginServiceMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    controller = module.get<UsersController>(UsersController);
    loginService = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(loginService).toBeDefined();
  });
});
