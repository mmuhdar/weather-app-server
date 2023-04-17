import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const options = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };
  const app = await NestFactory.create(AppModule);
  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  //   res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  //   next();
  // });
  // app.enableCors({
  //   allowedHeaders: '*',
  //   origin: ['https://weather-app-mmuhdar.vercel.app', 'http://localhost:3000'],
  // });
  app.enableCors(options);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
