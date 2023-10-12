import { Injectable } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { Breed } from './entities/breed.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BreedsService {

  //inyeccion de la entidad
  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ){}

  async create(createBreedDto: CreateBreedDto) {
    return await this.breedRepository.save(createBreedDto);
    //return;
  }

  async findAll() {
    return await this.breedRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} breed`;
  }

  update(id: number, updateBreedDto: UpdateBreedDto) {
    return `This action updates a #${id} breed`;
  }

  remove(id: number) {
    return `This action removes a #${id} breed`;
  }
}
