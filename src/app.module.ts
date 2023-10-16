import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedsModule } from './breeds/breeds.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [

    //variables de entrono
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST, //'localhost',
      port: parseInt(process.env.POSTGRES_PORT), //5432,
      username: process.env.POSTGRES_USER, //'root',
      password: process.env.POSTGRES_PASSWORD, //'root',
      database: process.env.POSTGRES_DB, //'db_crud',
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
