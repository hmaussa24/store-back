import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorsService } from './colors.service';
import { ColorsController } from './colors.controller';
import { Color } from './color.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Color])],
  controllers: [ColorsController],
  providers: [ColorsService],
})
export class DetailsProductsModule {}
