import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { Producto } from './product.entity';
import { Color } from 'src/details-products/color.entity';
import { Categotia } from 'src/details-products/cotegoria.entity';
import { Talla } from 'src/details-products/talla.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producto, Color, Categotia, Talla])],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}
