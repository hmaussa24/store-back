import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Color } from './color.entity';
import { CreateColorDto } from './dtos/create-color.dto';
import { UpdateColorDto } from './dtos/update-color.dto';
import { Producto } from 'src/products/product.entity';

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async findAll(): Promise<Color[]> {
    return this.colorRepository.find();
  }

  async findOne(id: number): Promise<Color> {
    const color = await this.colorRepository.findOne({ where: { id } });
    if (!color) {
      throw new NotFoundException(`Color with ID ${id} not found`);
    }
    return color;
  }

  async create(createColorDto: CreateColorDto): Promise<Color> {
    const { productoId } = createColorDto;
    const producto = await this.productoRepository.findOne({
      where: { id: productoId },
    });
    if (!producto) {
      throw new NotFoundException(
        `Producto with ID ${createColorDto.productoId} not found`,
      );
    }
    const color = this.colorRepository.create({ ...createColorDto, producto });
    return this.colorRepository.save(color);
  }

  async update(id: number, updateColorDto: UpdateColorDto): Promise<Color> {
    const color = await this.findOne(id);
    Object.assign(color, updateColorDto);
    return this.colorRepository.save(color);
  }

  async remove(id: number): Promise<void> {
    const color = await this.findOne(id);
    await this.colorRepository.remove(color);
  }
}
