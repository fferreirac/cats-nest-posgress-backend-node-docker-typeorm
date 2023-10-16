import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
//import { jwtConstants } from './constants/jwt.constant';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: 
    [UsersModule,
      // JwtModule.register({
      //   global: true,
      //   secret: jwtConstants.secret,  // para que funcione hacer carpeta de constantes 
      //   signOptions:  { expiresIn: '1d'},
      // }),
      //refactorin para que el secreto se pueda guardar en memory_vars
      JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'),
          global: true,
          signOptions: {expiresIn: '1d' }
        }),
        inject: [ConfigService],
      }),
    
    ], //solo importamos el module
    
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule] // para que funcione hay que exportarlo
})
export class AuthModule {}
