import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CommonService } from '../common/common.service';
import { USER_PREFIX } from '../common/constant';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectModel('User') private readonly usersModel: Model<User>,
    private readonly commonService: CommonService
  ) {}
  async create(createUserDto: CreateUserDto): Promise<string> {
    try {
      const user = new this.usersModel({
        ...createUserDto,
        code: this.commonService.generateCode(USER_PREFIX.USERS),
        password: await this.commonService.hashPassword(createUserDto.password),
        created_user: 'admin@jcv.com', //TODO Agregar logica para la creacion del usuario.
      });

      const result = await user.save();
      return result.code;
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException((e as Error).message);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.usersModel.find().exec();
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException((e as Error).message);
    }
  }

  async findByCode(code: string): Promise<User | null> {
    try {
      return await this.usersModel.findOne({ code }).exec();
    } catch (e) {
      this.logger.error(e);

      throw new BadRequestException((e as Error).message);
    }
  }

  async validateEmail(
    email: string
  ): Promise<Pick<User, 'password' | 'role'> | null> {
    try {
      return await this.usersModel
        .findOne({ email }, { password: 1, role: 1 })
        .exec();
    } catch (e) {
      this.logger.error(e);

      throw new BadRequestException((e as Error).message);
    }
  }
}
