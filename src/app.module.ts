import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { TicketsModule } from './tickets/tickets.module';
import { CommonService } from './common/common.service';
import { LoginModule } from './login/login.module';
import { LoginMiddleware } from './login/login.middleware';
import { TicketsController } from './tickets/tickets.controller';
import { MongoConfig } from './config/db/mongo.config';
import { GraphQLConfig } from './config/graphql/graphql.config';
import { PostgresConfig } from './config/db/postgres.config';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [
    UsersModule,
    TicketsModule,
    MongooseModule.forRoot(MongoConfig),
    TypeOrmModule.forRoot(PostgresConfig),
    LoginModule,
    GraphQLModule.forRoot<ApolloDriverConfig>(GraphQLConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
    }),
    KafkaModule,
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
