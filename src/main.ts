import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './trasnform.interceptor';

declare const module: any;

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  const port=4300;
 // const port = process.env.PORT;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`)

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => app.close());
}

}
bootstrap();