import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.setGlobalPrefix("api/v1"); //prefijo para las apis

  app.useGlobalPipes(  
    new ValidationPipe({ //hay que importarlo, 
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, //este partial hace las transformaciones posibles
    })
  );

 // Falto agregar CORS
 app.enableCors();

 // configuracion de wsagger
 const config = new DocumentBuilder()
    .setTitle("Cats example")
    .setDescription("The cast API description")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  await app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();
