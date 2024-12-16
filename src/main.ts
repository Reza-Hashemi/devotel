import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
const logger = new Logger("Main")

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configService = app.get(ConfigService);
  const port = configService.get<number>("PORT")
  await app.listen(process.env.PORT ?? 3000);
  logger.log(`🚀 Server is running on: http://localhost:${port}`);
}
bootstrap();
