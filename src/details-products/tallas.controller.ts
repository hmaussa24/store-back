import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TallasService } from './tallas.service';
import { CreateTallaDto } from './dtos/create-talla.dto';
import { UpdateTallaDto } from './dtos/update-talla.dto';

@Controller('tallas')
export class TallasController {
  constructor(private readonly tallasService: TallasService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.tallasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tallasService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createTallaDto: CreateTallaDto) {
    return this.tallasService.create(createTallaDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTallaDto: UpdateTallaDto) {
    return this.tallasService.update(+id, updateTallaDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tallasService.remove(+id);
  }
}
