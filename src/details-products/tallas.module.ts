import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TallasService } from './tallas.service';
import { TallasController } from './tallas.controller';
import { Talla } from './talla.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Talla])],
  controllers: [TallasController],
  providers: [TallasService],
})
export class TallasModule {}
