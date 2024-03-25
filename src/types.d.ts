
import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: jwt.JwtPayload | string; // Adjust the type according to your payload
  }
}
