/* eslint-disable @typescript-eslint/no-unsafe-call */
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function SwaggerConfig(app) {
  const config = new DocumentBuilder()
    .setTitle('Products API')
    .setDescription('Products Endpoints')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  return SwaggerModule.createDocument(app, config);
}
