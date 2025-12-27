import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { LoginMiddleware } from './login.middleware';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'my-secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [LoginMiddleware, LoginService],
  exports: [LoginMiddleware, LoginModule],
})
export class LoginModule {}
