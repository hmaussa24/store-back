import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Talla } from './talla.entity';
import { CreateTallaDto } from './dtos/create-talla.dto';
import { UpdateTallaDto } from './dtos/update-talla.dto';

@Injectable()
export class TallasService {
  constructor(
    @InjectRepository(Talla)
    private readonly tallaRepository: Repository<Talla>,
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
    const talla = this.tallaRepository.create(createTallaDto);
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
