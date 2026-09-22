import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('WisataKu API')
    .setDescription(
      'API untuk platform informasi dan reservasi destinasi wisata',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

  // Ekspor dokumentasi API ke file openapi.json
  fs.writeFileSync(
    './openapi.json',
    JSON.stringify(document, null, 2),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();