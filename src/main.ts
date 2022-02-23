import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './trasnform.interceptor';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(4300);
  
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

}
bootstrap();