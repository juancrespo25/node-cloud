import {
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class LoginMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoginMiddleware.name);

  constructor(private readonly jwtService: JwtService) {}
  use(req: Request, res: Response, next: () => void) {
    const request = req.headers['authorization'];
    const token = request ? request.split(' ')[1] : null;

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { email, role } = this.jwtService.verify(token, {
        secret: 'my-secret',
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      req['user_email'] = email;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      req['user_role'] = role;
    } catch (e) {
      this.logger.error(e);
      throw new UnauthorizedException('Invalid token');
    }
    next();
  }
}
