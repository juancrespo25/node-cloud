import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  private users: User[] = [];
  create(createUserDto: CreateUserDto): number {
    const user: User = {
      ...createUserDto,
      id: this.users.length + 1,
      code: `USR${this.users.length + 1}`,
    };
    this.users.push(user);
    this.logger.log(`Se creo el usuario: ${user.id}`);
    return user.id;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
}
