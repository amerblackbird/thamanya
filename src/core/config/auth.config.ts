import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  secret: process.env.AUTH_JWT_SECRET,
  refreshTokenSecret: process.env.AUTH_JWT_REFRESH_TOKEN_SECRET,
  expires: process.env.AUTH_JWT_TOKEN_EXPIRES_IN,
  tokenExpiresIn: process.env.AUTH_JWT_TOKEN_EXPIRES_IN,
  refreshExpiresIn: process.env.AUTH_JWT_REFRESH_TOKEN_EXPIRES_IN,
  verificationExpiresIn: process.env.verificationExpiresIn,
  emailVerificationExpiresIn: process.env.emailVerificationExpiresIn,
}));
