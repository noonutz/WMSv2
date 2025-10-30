import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true,
  });


  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Swagger documentation
  const config = app.get(ConfigService);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('WMS API')
    .setDescription('Warehouse Management System API Documentation')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  // Start the application
  const configuredPort = config.get<string>('PORT');
  const parsedPort = configuredPort ? Number.parseInt(configuredPort, 10) : 3000;
  const port = Number.isNaN(parsedPort) ? 3000 : parsedPort;
  await app.listen(port);

  Logger.log(`🚀 WMS Backend is running on: http://localhost:${port}`);
  Logger.log(`📖 API Documentation: http://localhost:${port}/api/docs`);
}

bootstrap().catch((error) => {
  Logger.error('Failed to start application', error);
  process.exit(1);
});
