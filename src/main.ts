import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggerInterceptor } from './common/logger.interseceptor';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))

  
  app.useGlobalInterceptors(app.get(LoggerInterceptor))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
