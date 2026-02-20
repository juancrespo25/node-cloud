/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Transform } from 'class-transformer';

export const EmailUser = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return request.user_email;
  }
);

export const ToLowerCaseDTO = () => {
  return Transform(({ value }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (typeof value !== 'string') return value;
    return value.trim().toLowerCase();
  });
};
