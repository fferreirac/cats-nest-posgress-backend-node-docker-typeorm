import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

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

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
