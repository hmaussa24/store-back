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
import { ImagenesService } from './imagenes.service';
import { CreateImagenDto } from './dtos/create-imagen.dto';
import { UpdateImagenDto } from './dtos/update-imagen.dto';

@Controller('imagenes')
@UseGuards(AuthGuard('jwt'))
export class ImagenesController {
  constructor(private readonly imagenesService: ImagenesService) {}

  @Get()
  findAll() {
    return this.imagenesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagenesService.findOne(+id);
  }

  @Post()
  create(@Body() createImagenDto: CreateImagenDto) {
    return this.imagenesService.create(createImagenDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImagenDto: UpdateImagenDto) {
    return this.imagenesService.update(+id, updateImagenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagenesService.remove(+id);
  }
}
