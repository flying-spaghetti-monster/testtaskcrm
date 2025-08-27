import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);

	app.useGlobalPipes(new ValidationPipe({
		transform: true,
	}));

	app.enableCors({
		origin: configService.getOrThrow<string>('CORS_URL'),
		methods: 'GET',
		credentials: true,
	});

	await app.listen(configService.getOrThrow<string>('PORT'), () => {
		console.log(`REST API: http://localhost:${configService.getOrThrow<string>('PORT')}`);
	});
}

bootstrap();
