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
@UseGuards(AuthGuard('jwt'))
export class TallasController {
  constructor(private readonly tallasService: TallasService) {}

  @Get()
  findAll() {
    return this.tallasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tallasService.findOne(+id);
  }

  @Post()
  create(@Body() createTallaDto: CreateTallaDto) {
    return this.tallasService.create(createTallaDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTallaDto: UpdateTallaDto) {
    return this.tallasService.update(+id, updateTallaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tallasService.remove(+id);
  }
}
