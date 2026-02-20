import { ForbiddenException } from '@nestjs/common';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from './types/role.type';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger: Logger = new Logger(RolesGuard.name);

  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const rolesValidate = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const userRole = request['user_role'];

    this.logger.debug(`User role: ${userRole}`);
    if (!userRole) {
      throw new ForbiddenException('User role not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const hasRole = rolesValidate.includes(userRole);

    if (!hasRole) {
      throw new ForbiddenException(
        `Access denied. Required roles: ${rolesValidate.join(', ')}`
      );
    }
    return true;
  }
}
