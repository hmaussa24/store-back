import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Compra } from './compra.entity';
import { CreateCompraDto } from './dtos/create-compra.dto';
import { UpdateCompraDto } from './dtos/update-compra.dto';
import { Producto } from 'src/products/product.entity';
import { Client } from 'src/clientes/client.entity';
import { CreateClientDto } from 'src/clientes/dtos/create-client.dto';
import { Talla } from 'src/details-products/talla.entity';
import { WhatsAppService } from 'src/meta/whatsapp.service';
import { Color } from 'src/details-products/color.entity';

@Injectable()
export class ComprasService {
  constructor(
    @InjectRepository(Compra)
    private readonly compraRepository: Repository<Compra>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Talla)
    private readonly tallaRepository: Repository<Talla>,
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
    private readonly whatsAppService: WhatsAppService,
  ) {}

  async create(createCompraDto: CreateCompraDto): Promise<Compra> {
    const { productoId, clientId, tallaId, colorId } = createCompraDto;
    const productos = await this.productoRepository.findOne({
      where: { id: productoId },
    });
    const client = await this.clientRepository.findOne({
      where: { id: clientId },
    });

    const talla = await this.tallaRepository.findOne({
      where: { id: tallaId },
    });

    const color = await this.colorRepository.findOne({
      where: { id: colorId },
    });
    if (!color) {
      throw new HttpException(
        `Color with ID ${colorId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    if (!talla) {
      throw new HttpException(
        `Talla with ID ${tallaId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!productos) {
      throw new HttpException(
        `Producto with ID ${productoId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    if (!client) {
      throw new HttpException(
        `Client with ID ${clientId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    const compra = this.compraRepository.create({
      ...createCompraDto,
      producto: productos,
      client: client,
      talla: talla,
      color: color,
    });
    if (!compra) {
      throw new HttpException(
        `Compra could not be created`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const messageDeCompra = `Se ha realizado una compra con los siguientes datos: \n\n ${productos.nombre} realizada por ${client.nombre} con el número de cédula ${client.cedula}. El número de la compra es ${compra.referencia}. El estado de la compra es ${compra.estado}. El precio total es ${compra.producto.precioPublico}.`;
    await this.whatsAppService.sendMessage(
      `57${client.telefono}`,
      messageDeCompra,
    );
    return this.compraRepository.save(compra);
  }

  async createWithClient(
    createCompraDto: CreateCompraDto,
    createClientDto: CreateClientDto,
  ): Promise<Compra> {
    let client = await this.clientRepository.findOne({
      where: { cedula: createClientDto.cedula },
    });

    if (!client) {
      client = this.clientRepository.create(createClientDto);
      client = await this.clientRepository.save(client);
    }

    const { productoId, tallaId } = createCompraDto;
    const producto = await this.productoRepository.findOne({
      where: { id: productoId },
    });
    const talla = await this.tallaRepository.findOne({
      where: { id: tallaId },
    });

    const color = await this.colorRepository.findOne({
      where: { id: createCompraDto.colorId },
    });
    if (!color) {
      throw new HttpException(
        `Color with ID ${createCompraDto.colorId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!producto) {
      throw new HttpException(
        `Producto with ID ${productoId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!talla) {
      throw new HttpException(
        `Talla with ID ${tallaId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const compra = this.compraRepository.create({
      ...createCompraDto,
      client,
      producto,
      talla,
      color,
    });

    if (!compra) {
      throw new HttpException(
        `Compra could not be created`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const messageDeCompra = `Se ha realizado una compra con los siguientes datos: \n\n ${producto.nombre} realizada por ${client.nombre} con el número de cédula ${client.cedula}. El número de la compra es ${compra.referencia}. El estado de la compra es ${compra.estado}. El precio total es ${compra.producto.precioPublico}.`;
    await this.whatsAppService.sendMessage(
      process.env.WHATSAPP_PHONE,
      messageDeCompra,
    );

    return this.compraRepository.save(compra);
  }

  findAll(): Promise<Compra[]> {
    return this.compraRepository.find({
      relations: ['client', 'producto', 'producto.imagenes', 'talla', 'color'],
    });
  }

  findOne(id: number): Promise<Compra> {
    return this.compraRepository.findOne({
      where: { id },
      relations: ['client', 'producto', 'talla', 'producto.imagenes'],
    });
  }

  update(id: number, updateCompraDto: UpdateCompraDto): Promise<Compra> {
    return this.compraRepository.save({ ...updateCompraDto, id });
  }

  async updateTransferenciaId(
    compraId: number,
    transferenciaId: string,
  ): Promise<Compra> {
    const compra = await this.compraRepository.findOne({
      where: { id: compraId },
    });

    if (!compra) {
      throw new HttpException(
        `Compra with ID ${compraId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    compra.transferenciaId = transferenciaId;
    compra.estado = 'Pagado';
    return this.compraRepository.save(compra);
  }

  async updateEstado(
    compraId: number,
    estado:
      | 'Pendiente'
      | 'Pagado'
      | 'Cancelado'
      | 'Entregado'
      | 'Enviado'
      | 'Enviado-Contraentrega',
  ): Promise<Compra> {
    const compra = await this.compraRepository.findOne({
      where: { id: compraId },
    });

    if (!compra) {
      throw new HttpException(
        `Compra with ID ${compraId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    compra.estado = estado;
    return this.compraRepository.save(compra);
  }

  remove(id: number): Promise<void> {
    return this.compraRepository.delete(id).then(() => undefined);
  }
}
