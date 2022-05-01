import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecurityMaster } from './module/security_master/security_master.module';
import { TodoModule } from './module/todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: false,
    }),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION as any,
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      cli: {
        migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
        entitiesDir: process.env.TYPEORM_ENTITIES_DIR,
      },
      autoLoadEntities: true,
      synchronize: false,
    }),
    TodoModule,
    SecurityMaster,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
