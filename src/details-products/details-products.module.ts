import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorsService } from './colors.service';
import { ColorsController } from './colors.controller';
import { Color } from './color.entity';
import { Producto } from 'src/products/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Color, Producto])],
  controllers: [ColorsController],
  providers: [ColorsService],
})
export class DetailsProductsModule {}
