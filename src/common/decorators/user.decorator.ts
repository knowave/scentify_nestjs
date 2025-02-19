import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CurrentUserType } from '../types/current-user.type';

export const CurrentUser = createParamDecorator(
  (_, ctx: ExecutionContext): CurrentUserType => {
    const { user } = ctx.switchToHttp().getRequest();
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      isDeleted: user.isDeleted,
    };
  },
);
