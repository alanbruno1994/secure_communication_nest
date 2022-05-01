import { AccessAllMiddleware } from 'src/module/security_master/access-all.middleware';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { SecurityMaster } from '../security_master/security_master.module';
import { AccessMasterMiddleware } from 'src/module/security_master/access-master.middleware';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
  imports: [SecurityMaster],
})
export class TodoModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AccessMasterMiddleware)
      .forRoutes({ path: 'todo', method: RequestMethod.POST });
    consumer
      .apply(AccessAllMiddleware)
      .forRoutes({ path: 'todo', method: RequestMethod.GET });
  }
}
