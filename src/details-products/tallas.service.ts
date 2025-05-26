import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Talla } from './talla.entity';
import { CreateTallaDto } from './dtos/create-talla.dto';
import { UpdateTallaDto } from './dtos/update-talla.dto';
import { Producto } from 'src/products/product.entity';

@Injectable()
export class TallasService {
  constructor(
    @InjectRepository(Talla)
    private readonly tallaRepository: Repository<Talla>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async findAll(): Promise<Talla[]> {
    return this.tallaRepository.find();
  }

  async findOne(id: number): Promise<Talla> {
    const talla = await this.tallaRepository.findOne({ where: { id } });
    if (!talla) {
      throw new NotFoundException(`Talla with ID ${id} not found`);
    }
    return talla;
  }

  async create(createTallaDto: CreateTallaDto): Promise<Talla> {
    const { productoId, ...tallaData } = createTallaDto;
    const producto = await this.productoRepository.findOne({
      where: { id: productoId },
    });
    if (!producto) {
      throw new NotFoundException(
        `Producto with ID ${createTallaDto.productoId} not found`,
      );
    }
    const talla = this.tallaRepository.create({
      ...tallaData,
      producto,
    });
    return this.tallaRepository.save(talla);
  }

  async update(id: number, updateTallaDto: UpdateTallaDto): Promise<Talla> {
    const talla = await this.findOne(id);
    Object.assign(talla, updateTallaDto);
    return this.tallaRepository.save(talla);
  }

  async remove(id: number): Promise<void> {
    const talla = await this.findOne(id);
    await this.tallaRepository.remove(talla);
  }
}
