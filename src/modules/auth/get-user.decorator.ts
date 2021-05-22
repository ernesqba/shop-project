import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../user/user.entity';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    return ctx.switchToHttp().getRequest().user;
  },
);
