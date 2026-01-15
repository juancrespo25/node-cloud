import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
ConfigModule.forRoot({
  envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
});

const configService = new ConfigService();

export const GraphQLConfig: ApolloDriverConfig = {
  driver: ApolloDriver,
  playground: configService.get<boolean>('GRAPHQL_PLAYGROUND'),
  autoSchemaFile: configService.get<boolean>('GRAPHQL_DEBUG'), //* Solo en un entorno controlado (DEV)
  // Additional configurations can be added here using configService if needed
};
