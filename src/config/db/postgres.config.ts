import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
ConfigModule.forRoot({
  envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
});

const configService = new ConfigService();

export const PostgresConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  autoLoadEntities: true, //* Carga automaticamente las entidades solo en local
  synchronize: true, //* Solo debe de ser true en un ambiente controlado, de pruebas o local
};
