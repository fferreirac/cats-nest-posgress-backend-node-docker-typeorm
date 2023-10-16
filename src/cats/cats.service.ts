import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from '../breeds/entities/breed.entity';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { Role } from '../common/enums/role.enum';

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
    // return await this.catRepository.save(createCatDto);
    /*const breed = await this.breedRepository.findOneBy({name: CreateCatDto.breed});
    if(!breed){
      throw new BadRequestException('Breed not found!');
    }*/
    const breed = await this.validateBreed(CreateCatDto.breed);

    return await this.catRepository.save({
      ...CreateCatDto,
      breed,
      userEmail: user.email  // ahora si le podemos mandar el email del usuario activo
    });
  }

  async findAll( user: UserActiveInterface ) {
    console.log('userRole: ', user.role);
    if(user.role === Role.ADMIN){
      return await this.catRepository.find();  
    }
    console.log('userEmail: ', user.email);
    return await this.catRepository.find({
      where: { userEmail: user.email},
    });
  }

  async findOne(id: number, user: UserActiveInterface) {
    const cat = await this.catRepository.findOneBy({id});

    if (!cat){
      throw new BadRequestException('Cat not found');
    }

    this.validateOwnership(cat, user);
    
    return cat;
  }

  async update(id: number, updateCatDto: UpdateCatDto, user: UserActiveInterface) {
    
    await this.findOne(id,user);
    
    return await this.catRepository.update(id, {
      ...updateCatDto,
      breed: updateCatDto.breed ? await this.validateBreed(updateCatDto.breed) : undefined,
      userEmail: user.email
    });
  }

  async remove(id: number, user: UserActiveInterface) {
    
    await this.findOne(id,user);
    return await this.catRepository.softDelete({id}); // se le pasa un id
    //return await this.catRepository.softRemove({id}); // se le pasa una instancia
  }

  // METODO para verificar el dueño del gato o es Admin.
  private validateOwnership(cat: Cat, user: UserActiveInterface){
    if(user.role !== Role.ADMIN && cat.userEmail !== user.email){
      throw new UnauthorizedException();
    }
  }


  // metodo para verificar las razas
  private async validateBreed(breed: string){
    const breedEntity = await this.breedRepository.findOneBy({ name: breed});

    if (!breedEntity){
      throw new BadRequestException('Breed not found!');
    }
    return breedEntity;
  }

}
