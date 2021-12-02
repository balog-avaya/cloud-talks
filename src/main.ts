import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  console.log("Bootstrap");
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());



  const config = new DocumentBuilder()
  .setTitle('Cloud Talks')
  .setDescription('Cloud Talks')
  .setVersion('1.0')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
