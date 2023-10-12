import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

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


  await app.listen(3000);
}
bootstrap();
