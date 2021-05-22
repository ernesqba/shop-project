import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';
import * as helmet from 'helmet';

import { AppModule } from './app.module';
import { ErrorsInterceptor } from './core/interceptors/error.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // global middlewares
  app.use(helmet());
  app.use(morgan('dev'));

  // global interceptors
  app.useGlobalInterceptors(new ErrorsInterceptor());

  // global endpoints prefix
  app.setGlobalPrefix('v1');

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
