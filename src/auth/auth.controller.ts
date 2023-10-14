import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { Role } from './enums/role.enum';
import { Auth } from './decorators/auth.decorator';

// hacemos la interface
interface RequestWithUser extends Request {
    user: {
        email: string;
        role: string;
    }
}

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

    /*
    @Get('profile')
    //decorador perosnalizado para roles
    @Roles(Role.ADMIN) // le mandamos la ruta que necesitamos en este caso admin    
    @UseGuards(AuthGuard, RolesGuard) // decorador especial para que pase por la authorization  
    profile(@Req() req: RequestWithUser) { //usamos el requestUser que ahora se llamara @Req
        return this.authService.profile(req.user);
    }*/

    // sustituye al codigode arriba
    @Get('profile')
    @Auth(Role.ADMIN) 
    profile(@Req() req: RequestWithUser) {
        return this.authService.profile(req.user);
    }
}


