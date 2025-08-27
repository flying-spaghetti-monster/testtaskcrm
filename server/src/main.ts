import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');

  // app.useGlobalPipes(new ValidationPipe({
  //   transform: true, // This is crucial for type conversion
  // }));

  app.enableCors({
    origin: configService.getOrThrow<string>('CORS_URL'), // Allow all origins by default
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })

  await app.listen(configService.getOrThrow<string>('PORT'), () => {
    console.log(`REST API: http://localhost:${configService.getOrThrow<string>('PORT')}/api`);
  });
}

bootstrap();
