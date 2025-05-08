import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './libs/utils/swagger/api-swagger.config';
import { HttpExceptionFilter } from './libs/exception/exception-filter';

const config = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const host: string = config.get<string>('HOST');
  const port: string = config.get<string>('PORT');
  const env: string = config.get<string>('NODE_ENV');
 
  /**
   * Set Prefix Path.
   */
  app.setGlobalPrefix('/api');

  app.useGlobalFilters(new HttpExceptionFilter());
  /**
   * Global Validation.
   */
  // app.useGlobalPipes(new ValidationPipe(
  //   { transform: true, 
  //     transformOptions: {
  //         enableImplicitConversion: true,
  //     },
  //     whitelist: true, 
  //     forbidNonWhitelisted: true,
  //   }));

  /**
   * Enable Cors.
   */
  app.enableCors();

  setupSwagger(app)

  /**
   * Listnere port log.
   */
  await app.listen(port, () => {
    console.log('[DIE API]', `Server running on http://${host}:${port}`);
  });
}
bootstrap();
