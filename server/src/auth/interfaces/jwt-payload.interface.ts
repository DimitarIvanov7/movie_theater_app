export interface JwtPayload {
  name: string;
  iat: number;
  exp: number;
}

export type JwtPayloadWithRt = JwtPayload & { refreshToken: string };
