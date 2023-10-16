import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), forwardRef(()=> AuthModule), //forwardRef para evitar la referencia circular
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // para que otro modulo lo pueda ocupar
})
export class UsersModule {}
