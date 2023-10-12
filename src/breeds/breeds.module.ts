import { Module } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { BreedsController } from './breeds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Breed])], // 1ra. linea para la comunicacion entre modulos
  controllers: [BreedsController],
  providers: [BreedsService],
  exports: [TypeOrmModule] // 2da. linea para la comunicacion entre modulos

})
export class BreedsModule {}
