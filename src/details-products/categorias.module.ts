import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { Categotia } from './cotegoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categotia])],
  controllers: [CategoriasController],
  providers: [CategoriasService],
})
export class CategoriasModule {}
