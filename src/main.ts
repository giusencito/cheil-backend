/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfig } from './common/config/swagger.config';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  app.getHttpAdapter().get('/health', (req, res) => {
    res.status(200).send('OK');
  });
  const document = SwaggerConfig(app);
  SwaggerModule.setup('api', app, document);

  await app.listen(8080, '0.0.0.0');
}

bootstrap();
