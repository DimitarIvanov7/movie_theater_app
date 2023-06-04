import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../user.entity';
import {
  JwtPayload,
  JwtPayloadWithRt,
} from '../interfaces/jwt-payload.interface';

export const GetJwtPayload = createParamDecorator(
  (
    data: keyof JwtPayloadWithRt | undefined,
    ctx: ExecutionContext,
  ): keyof JwtPayloadWithRt | JwtPayloadWithRt => {
    const req = ctx.switchToHttp().getRequest();
    if (!data) return req.user;
    return req.user[data];
  },
);
