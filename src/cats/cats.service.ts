import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from '../breeds/entities/breed.entity';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';

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


  async create(CreateCatDto: CreateCatDto, user: UserActiveInterface) { // adicionamos el userActivo
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
      userEmail: user.email  // ahora si le podemos mandar el email del usuario activo
    });
  }

  async findAll(user: UserActiveInterface) {
    return await this.catRepository.find({
      where: { userEmail: user.email},
    });
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
