import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import * as bcrytjs from 'bcryptjs'; //puede ser un modulo/servicio pero por ahora lo meteremos en el servicio
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ){}


    async register({name, email, password}: RegisterDto){

        const user = await this.usersService.findOneByEmail(email);

        if(user){
            throw new BadRequestException('User already exists!');
        }


        return await this.usersService.create({
            name, 
            email, 
            password: await bcrytjs.hash(password,10)
        });
        
    }

    async login({email, password}: LoginDto){
        const user = await this.usersService.findOneByEmail(email);
        if(!user){
            throw new UnauthorizedException('Email is wrong!');
        }
        const isPasswordValid = await bcrytjs.compare(password, user.password); 
        if (!isPasswordValid){
            throw new UnauthorizedException('Password is wrong!');
        }

        const payload = { email: user.email};

        const token = await this.jwtService.signAsync(payload);

        //return user;
        return {
            token,
            email,
        }
    }
}


