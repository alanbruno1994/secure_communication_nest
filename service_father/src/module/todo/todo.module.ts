import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { SecurityMaster } from '../security_master/security_master.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AccessAllMiddleware } from '../security_master/access-all.middleware';
import { AccessMasterMiddleware } from '../security_master/access-master.middleware';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
  imports: [
    SecurityMaster,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.SECRET_KEY_MASTER,
        signOptions: {
          expiresIn: '24h',
        },
      }),
    }),
  ],
})
export class TodoModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AccessAllMiddleware)
      .forRoutes({ path: 'todo', method: RequestMethod.POST });
    consumer
      .apply(AccessMasterMiddleware)
      .forRoutes({ path: 'todo/:id', method: RequestMethod.DELETE });
  }
}
