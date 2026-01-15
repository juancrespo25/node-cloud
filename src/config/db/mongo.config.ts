import { ConfigModule, ConfigService } from '@nestjs/config';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
ConfigModule.forRoot({
  envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
});

const configService = new ConfigService();

export const MongoConfig: string = `${configService.get<string>('MONGO_URL')}${configService.get<string>('MONGO_DBNAME')}`;
