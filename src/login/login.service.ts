import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  private readonly logger: Logger = new Logger(LoginService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async login({ email, password }: LoginDto): Promise<string> {
    try {
      //* 1. Validar si el usuario existe
      const user = await this.usersService.validateEmail(email);

      if (!user) {
        throw new UnauthorizedException(`User or Password incorrecto`);
      }
      //* 2. Validar la contraseña ingresada(encriptada)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('User or Password incorrecto');
      }

      //* 3. JWT para el login
      const payload = {
        email,
        role: user.role,
      };

      return await this.jwtService.signAsync(payload);
    } catch (e) {
      this.logger.error(e);
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message);
      }
      throw new UnauthorizedException('An unexpected error occurred');
    }
  }
}
