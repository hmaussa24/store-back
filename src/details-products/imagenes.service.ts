import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Imagen } from './image.entity';
import { CreateImagenDto } from './dtos/create-imagen.dto';
import { UpdateImagenDto } from './dtos/update-imagen.dto';

@Injectable()
export class ImagenesService {
  constructor(
    @InjectRepository(Imagen)
    private readonly imagenRepository: Repository<Imagen>,
  ) {}

  async findAll(): Promise<Imagen[]> {
    return this.imagenRepository.find();
  }

  async findOne(id: number): Promise<Imagen> {
    const imagen = await this.imagenRepository.findOne({ where: { id } });
    if (!imagen) {
      throw new NotFoundException(`Imagen with ID ${id} not found`);
    }
    return imagen;
  }

  async create(createImagenDto: CreateImagenDto): Promise<Imagen> {
    const imagen = this.imagenRepository.create(createImagenDto);
    return this.imagenRepository.save(imagen);
  }

  async update(id: number, updateImagenDto: UpdateImagenDto): Promise<Imagen> {
    const imagen = await this.findOne(id);
    Object.assign(imagen, updateImagenDto);
    return this.imagenRepository.save(imagen);
  }

  async remove(id: number): Promise<void> {
    const imagen = await this.findOne(id);
    await this.imagenRepository.remove(imagen);
  }
}
