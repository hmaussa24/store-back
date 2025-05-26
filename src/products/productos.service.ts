import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './product.entity';
import { CreateProductoDto } from './dtos/create-producto.dto';
import { UpdateProductoDto } from './dtos/update-producto.dto';
import { Categotia } from 'src/details-products/cotegoria.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(Categotia)
    private readonly categoriaRepository: Repository<Categotia>,
  ) {}

  async findAll(): Promise<Producto[]> {
    return this.productoRepository.find({
      relations: ['colors', 'imagenes', 'categorias', 'tallas'],
    });
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({
      where: { id },
      relations: ['colors', 'imagenes', 'categorias', 'tallas'],
    });
    if (!producto) {
      throw new NotFoundException(`Producto with ID ${id} not found`);
    }
    return producto;
  }

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const { categoriasId } = createProductoDto;

    const categorias = await this.categoriaRepository.findOne({
      where: { id: categoriasId },
    });
    if (!categorias) {
      throw new NotFoundException(
        `Categoria with ID ${categoriasId} not found`,
      );
    }
    const producto = this.productoRepository.create({
      ...createProductoDto,

      categorias: categorias,
    });
    return this.productoRepository.save(producto);
  }

  async update(
    id: number,
    updateProductoDto: UpdateProductoDto,
  ): Promise<Producto> {
    const producto = await this.findOne(id);
    Object.assign(producto, updateProductoDto);
    return this.productoRepository.save(producto);
  }

  async remove(id: number): Promise<void> {
    const producto = await this.findOne(id);
    await this.productoRepository.remove(producto);
  }
}
