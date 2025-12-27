import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { TicketsModule } from './tickets/tickets.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
