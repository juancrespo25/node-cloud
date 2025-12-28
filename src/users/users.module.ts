import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { CommonService } from '../common/common.service';
import { LoginService } from '../login/login.service';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService, CommonService, LoginService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {
  // * middleware (no es en todos los casos).
}
