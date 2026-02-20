import { SetMetadata } from '@nestjs/common';
import { UserRole } from './types/role.type';

export const ROLES_KEY = 'roles'; //TODO El ROLE_KEY deberia ir en las variables de entorno
export const Roles = (...role: UserRole[]) => SetMetadata(ROLES_KEY, role);
