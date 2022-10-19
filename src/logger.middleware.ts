import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`From middleware: Request...`);
  req["user"] = {
    name: "Dat",
    roles: "admin"
  }
  next();
}
