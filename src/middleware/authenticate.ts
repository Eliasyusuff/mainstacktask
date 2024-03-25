
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new Error();
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded; // Add the user payload to the request object
    next();
  } catch (error) {
    console.log("error here", error);
    res.status(401).send({ message: 'Please authenticate.' });
  }
};
