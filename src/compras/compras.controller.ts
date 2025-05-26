import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ComprasService } from './compras.service';
import { CreateCompraDto } from './dtos/create-compra.dto';
import { UpdateCompraDto } from './dtos/update-compra.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateClientDto } from 'src/clientes/dtos/create-client.dto';

@Controller('compras')
export class ComprasController {
  constructor(private readonly comprasService: ComprasService) {}

  @Post()
  create(@Body() createCompraDto: CreateCompraDto) {
    return this.comprasService.create(createCompraDto);
  }

  @Post('with-client')
  createWithClient(
    @Body('compra') createCompraDto: CreateCompraDto,
    @Body('client') createClientDto: CreateClientDto,
  ) {
    return this.comprasService.createWithClient(
      createCompraDto,
      createClientDto,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.comprasService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comprasService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompraDto: UpdateCompraDto) {
    return this.comprasService.update(+id, updateCompraDto);
  }

  @Patch(':id/transferencia-id')
  async updateTransferenciaId(
    @Param('id') id: string,
    @Body('transferenciaId') transferenciaId: string,
  ) {
    return this.comprasService.updateTransferenciaId(+id, transferenciaId);
  }

  @Patch(':id/estado')
  async updateEstado(
    @Param('id') id: string,
    @Body('estado')
    estado:
      | 'Pendiente'
      | 'Pagado'
      | 'Cancelado'
      | 'Entregado'
      | 'Enviado'
      | 'Enviado-Contraentrega',
  ) {
    return this.comprasService.updateEstado(+id, estado);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comprasService.remove(+id);
  }
}
