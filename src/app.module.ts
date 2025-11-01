import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './database/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductoModule } from './modules/product/product.module';
import { JwtAuthGuard } from './common/guards/jwt.guard';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { RequestContextInterceptor } from './common/interceptors/request-context.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserModule,
    CategoryModule,
    ProductoModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestContextInterceptor,
    },
  ],
})
export class AppModule {}
