/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): UserEntity | undefined => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user ? user : undefined;
  },
);
