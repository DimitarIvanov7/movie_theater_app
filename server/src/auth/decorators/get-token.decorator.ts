import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const ExtractToken = createParamDecorator(
  (_data, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    return token;
  },
);
