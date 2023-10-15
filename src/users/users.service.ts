import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { find } from 'rxjs';

@Injectable()
export class UsersService {

  //metemos el constructor
  constructor(
    @InjectRepository(User)
    private readonly useRepository: Repository<User>, //readonly para que no se pueda manipular
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.useRepository.save(createUserDto);
  }

  findOneByEmail(email: string){
    return this.useRepository.findOneBy({email})
  }

  findByEmailWithPassword(email: string) {
    return this.useRepository.findOne({
      where: {email}, 
      select: ['id','name','email','password','role'],
    });
  }

  findAll() {
    return this.useRepository.find();
  }

  findOne(id: number) {
    return this.useRepository.find();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
