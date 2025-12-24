import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(@InjectModel('User') private readonly usersModel: Model<User>) {}
  async create(createUserDto: CreateUserDto): Promise<string> {
    try {
      const user = new this.usersModel({
        ...createUserDto,
        code: this.generateCode('USER'),
        password: await this.hashPassword(createUserDto.password),
        created_user: 'admin@jcv.com', //TODO Agregar logica para la creacion del usuario.
      });

      const result = await user.save();
      return result.code;
    } catch (e) {
      this.logger.error(e);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new BadRequestException(e.message);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.usersModel.find().exec();
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(e);
    }
  }

  async findByCode(code: string): Promise<User | null> {
    try {
      return await this.usersModel.findOne({ code }).exec();
    } catch (e) {
      this.logger.error(e);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new BadRequestException(e.message);
    }
  }

  //TODO Desacoplar logica de los metodos private
  private generateCode(prefix: string): string {
    return `${prefix}-${Math.floor(100000 + Math.random() * 900000).toString()}`;
  }

  private async hashPassword(password: string): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const salt = await bcrypt.genSalt();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return bcrypt.hash(password, salt);
  }
}
