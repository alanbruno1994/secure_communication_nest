import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { SecureMasterService } from './secure.master.service';

@Injectable()
export class AccessMasterMiddleware implements NestMiddleware {
  constructor(private readonly secure: SecureMasterService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['access-token']) {
      const token = String(req.headers['access-token']).replace('Bearer ', '');
      await this.secure.accessMaster(token);
      console.log(token);
    }

    console.log('Request...');
    next();
  }
}
