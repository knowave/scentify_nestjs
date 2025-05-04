import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requireRole = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());

        if (!requireRole) return true;

        const req = context.switchToHttp().getRequest();
        const user = req.user;

        if (!user) return false;

        const userRole = user.role;
        return requireRole.includes(userRole);
    }
}
