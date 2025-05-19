import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/common/decorators/role.decorator';
import { ROLE } from 'src/common/enum/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.get<ROLE[]>(ROLES_KEY, context.getHandler());

        if (!requiredRoles) return true;

        const req = context.switchToHttp().getRequest();
        const user = req.user;

        if (!user) return false;

        const userRole = user.role;
        return requiredRoles.includes(userRole);
    }
}
