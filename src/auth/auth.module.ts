import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.constant';

@Module({
  imports: 
    [UsersModule,
      JwtModule.register({
        global: true,
        secret: jwtConstants.secret,  // para que funcione hacer carpeta de constantes 
        signOptions:  { expiresIn: '1d'},
      }),
    
    ], //solo importamos el module
    
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
