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
  const document = SwaggerConfig(app);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 8080);
}

bootstrap();
