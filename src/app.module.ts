import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedsModule } from './breeds/breeds.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host:'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'db_crud',
      //entities: [__dirname + '/**/*-enti{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    CatsModule,    
    BreedsModule, UsersModule, AuthModule,  
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
