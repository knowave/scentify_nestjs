import { SetMetadata } from '@nestjs/common';
import { ROLE } from '../enum/role.enum';

export const ROLES_KEY = 'role';

export const Roles = (...roles: ROLE[]) => SetMetadata(ROLES_KEY, roles);
