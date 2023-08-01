import {
  MiddlewareConsumer,
  Module,
  NestModule
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { APP_FILTER } from '@nestjs/core';
import { CatsModule } from './cats/cats.module';
import { HttpExceptionFilter } from './http-exception.filter';
import { logger } from './logger.middleware';
import { UploadfilesController } from './uploadfiles/uploadfiles.controller';
import { UserEntity } from './users/users.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CatsModule,TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'postgres',
    entities: [UserEntity],
    synchronize: true
  }), UsersModule], 
  controllers: [AppController, UploadfilesController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter
  },
UsersModule],
},)
export class AppModule implements NestModule {
  //constructor(private dataSource: DataSource) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)
      .forRoutes('*');
  }
}
