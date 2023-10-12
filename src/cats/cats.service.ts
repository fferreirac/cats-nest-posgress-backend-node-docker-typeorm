import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from 'src/breeds/entities/breed.entity';

@Injectable()
export class CatsService {

  // metemos el constructor e inyectamos la entidad
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,

    // para que incerte el campo relacuionado
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>
  ) {}


  async create(CreateCatDto: CreateCatDto) {
    // const cat = this.catRepository.create(CreateCatDto);
    // return await this.catRepository.save(cat);
    //return await this.catRepository.save(createCatDto);
    const breed = await this.breedRepository.findOneBy({name: CreateCatDto.breed});
    if(!breed){
      throw new BadRequestException('Breed not found!');
    }
    return await this.catRepository.save({
      ...CreateCatDto,
      breed,
    });
  }

  async findAll() {
    return await this.catRepository.find();
  }

  async findOne(id: number) {
    return await this.catRepository.findOneBy({id});
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    return await this.catRepository.update(id ,UpdateCatDto);
  }

  async remove(id: number) {
    return await this.catRepository.softDelete({id}); // se ele pasa un id
    //return await this.catRepository.softRemove({id}); // se le pasa una instancia
  }
}
