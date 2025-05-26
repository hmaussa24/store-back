import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagenesService } from './imagenes.service';
import { ImagenesController } from './imagenes.controller';
import { Imagen } from './image.entity';
import { Producto } from 'src/products/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Imagen, Producto])],
  controllers: [ImagenesController],
  providers: [ImagenesService],
})
export class ImagenesModule {}
