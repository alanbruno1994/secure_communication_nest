import { Module } from '@nestjs/common';
import { SecureMasterService } from './secure.master.service';

@Module({
  controllers: [],
  providers: [SecureMasterService],
  exports: [SecureMasterService],
  imports: [],
})
export class SecurityMaster {}
