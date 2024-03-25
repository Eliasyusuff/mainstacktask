import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

export const signUp = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '24h' });

    
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).send({ message: 'Login failed!' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '24h' });
 
    res.send({ user, token });
  } catch (error) {
    console.log("error here", error);
    console.log("req", req);
    res.status(400).send(error);
  }
};
