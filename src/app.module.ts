import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { TicketsModule } from './tickets/tickets.module';
import { CommonService } from './common/common.service';
import { LoginModule } from './login/login.module';
import { LoginMiddleware } from './login/login.middleware';
import { TicketsController } from './tickets/tickets.controller';

@Module({
  imports: [
    UsersModule,
    TicketsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/tecypport'),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      autoLoadEntities: true, //* Carga automaticamente las entidades solo en local
      synchronize: true, //* Solo debe de ser true en un ambiente controlado, de pruebas o local
    }),
    LoginModule,
  ],
  controllers: [],
  providers: [CommonService],
})
export class AppModule {
  constructor(private readonly loginMiddleware: LoginMiddleware) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      .apply(this.loginMiddleware.use.bind(this.loginMiddleware))
      .forRoutes(TicketsController);
  }
}
