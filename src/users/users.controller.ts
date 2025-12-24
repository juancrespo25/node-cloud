import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createUserDto: CreateUserDto) {
    const userCode = await this.usersService.create(createUserDto);
    //TODO agregar roles
    return {
      success: true,
      message: 'User created successfully',
      user_code: userCode,
    };
  }

  //TODO Agregar paginacion
  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return {
      success: true,
      messages: 'Users found successfully',
      users,
    };
  }

  @Get(':code')
  async findByCode(@Param('code') code: string) {
    return await this.usersService.findByCode(code);
  }
}
