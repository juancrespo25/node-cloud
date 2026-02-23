import { UsersService } from '../../../src/users/users.service';
import { CommonService } from '../../../src/common/common.service';
import { User, UserDocument } from '../../../src/users/schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';

import { Model } from 'mongoose';

describe('UsersService Unit Test', () => {
  let service: UsersService;
  let commonService: CommonService;
  let model: Model<UserDocument>;

  beforeEach(async () => {
    const userModelMock = jest.fn();
    const commonServiceMock = {
      generateCode: jest.fn(),
      hashPassword: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getModelToken(User.name), useValue: userModelMock },
        { provide: CommonService, useValue: commonServiceMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    commonService = module.get<CommonService>(CommonService);
    model = module.get(getModelToken(User.name));
  });

  it('Should service component', () => {
    expect(service).toBeDefined();
    expect(commonService).toBeDefined();
    expect(model).toBeDefined();
  });
});
