import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ){}

    @Post('register')
    register(
        @Body()
        registerDto: RegisterDto,
    ){
        return this.authService.register(registerDto);
    }

    @Post('login') //decorado que me permite activar la ruta y vervo
    login(
        @Body()
        loginDto: LoginDto,    
    ){
        return this.authService.login(loginDto);
    }

    @Get('profile')
    @UseGuards(AuthGuard) // decorador especial para que pase por la authorization
    profile(
        //usamos el requestUser
        @Request() req){
        return req.user;
    }
}
