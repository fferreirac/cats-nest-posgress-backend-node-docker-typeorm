import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/role.enum';
import { ActiveUser } from '../common/decorators/active-user-decorator';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';


@Auth(Role.USER)
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto, @ActiveUser() user: UserActiveInterface) { //adicionamos el userActivo
    return this.catsService.create(createCatDto, user); // le pasamos el usuario
  }

  @Get()
  findAll(@ActiveUser() user: UserActiveInterface) { //para que solo traiga sus gatos (creados por el)
    return this.catsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) { //regresa el gato si el lo creo
    return this.catsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCatDto: UpdateCatDto, @ActiveUser() user: UserActiveInterface) { //modifica si el gato es sutyo
    return this.catsService.update(id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) { //elimina si el gato es de el
    return this.catsService.remove(id);
  }
}
