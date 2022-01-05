import {NestFactory, Reflector} from '@nestjs/core';
import {AppModule} from './app.module';
import {ExpressAdapter, NestExpressApplication} from "@nestjs/platform-express";
import {
  ClassSerializerInterceptor,
  HttpStatus,
  INestApplication,
  UnprocessableEntityException,
  ValidationPipe
} from "@nestjs/common";
import {SharedModule} from "./modules/shared/shared.module";
import {ApiConfigService} from "./modules/shared/api-config.service";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    {cors: true},
  );
  app.enableVersioning();

  const reflector = app.get(Reflector);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      dismissDefaultMessages: true,
      exceptionFactory: (errors) => new UnprocessableEntityException(errors),
    }),
  );

  const configService = app.select(SharedModule).get(ApiConfigService);


  if (configService.isDevelopment) {
    setupSwagger(app, configService.apiVersion);
  }

  const port = configService.appConfig.port;

  await app.listen(port);

  console.info(`server running on port ${port}`);

  return app;

}

function setupSwagger(app: INestApplication, version: string): void {
  const documentBuilder = new DocumentBuilder().setTitle('Task Manager API').setVersion(version).addBearerAuth();


  documentBuilder.setVersion(version);

  const document = SwaggerModule.createDocument(app, documentBuilder.build());
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  console.info(
    `Documentation: http://localhost:${process.env.PORT}/api`,
  );
}

bootstrap();
