import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setupSwagger(app: INestApplication): void {
    const options = new DocumentBuilder()
      .setTitle("NestJS TypeORM Pagination")
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'JWT',
        )
      .setVersion("1.0.0")
      .build();
  
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("documentation", app, document);
  }