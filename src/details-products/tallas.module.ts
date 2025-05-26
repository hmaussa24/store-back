import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TallasService } from './tallas.service';
import { TallasController } from './tallas.controller';
import { Talla } from './talla.entity';
import { Producto } from 'src/products/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Talla, Producto])],
  controllers: [TallasController],
  providers: [TallasService],
})
export class TallasModule {}
