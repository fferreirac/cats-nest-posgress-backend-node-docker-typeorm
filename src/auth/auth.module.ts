import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule], //solo importamos el module
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
