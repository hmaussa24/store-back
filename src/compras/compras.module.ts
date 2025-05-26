import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComprasController } from './compras.controller';
import { ComprasService } from './compras.service';
import { Compra } from './compra.entity';
import { Producto } from 'src/products/product.entity';
import { Client } from 'src/clientes/client.entity';
import { Talla } from 'src/details-products/talla.entity';
import { ProductosModule } from 'src/products/productos.module';
import { ClientesModule } from 'src/clientes/clientes.module';
import { WhatsAppModule } from 'src/meta/whatsapp.module';
import { Color } from 'src/details-products/color.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Compra, Producto, Client, Talla, Color]),
    ProductosModule,
    ClientesModule,
    WhatsAppModule,
  ],
  controllers: [ComprasController],
  providers: [ComprasService],
})
export class ComprasModule {}
