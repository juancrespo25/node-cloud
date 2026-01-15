import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
  logger.log(
    `tecypport-app:${process.env.NODE_ENV} running and port ${process.env.PORT}`
  );
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
