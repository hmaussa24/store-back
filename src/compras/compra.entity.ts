import { Client } from 'src/clientes/client.entity';
import { Color } from 'src/details-products/color.entity';
import { Talla } from 'src/details-products/talla.entity';
import { Producto } from 'src/products/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Compra {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  referencia: string;
  @Column()
  cantidad: string;
  @Column()
  estado:
    | 'Pendiente'
    | 'Pagado'
    | 'Cancelado'
    | 'Entregado'
    | 'Enviado'
    | 'Enviado-Contraentrega';
  @Column()
  descuento: number;
  @Column()
  metodoPago: 'contraentrega' | 'transferencia';
  @Column()
  departamento: string;
  @Column()
  ciudad: string;
  @Column()
  direccion: string;
  @Column({ nullable: true })
  transferenciaId: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @ManyToOne(() => Client, (client) => client.compras)
  client: Client;
  @ManyToOne(() => Producto, (producto) => producto.compras)
  producto: Producto;
  @ManyToOne(() => Talla, (talla) => talla.compras)
  talla: Talla;
  @ManyToOne(() => Color, (color) => color.compras)
  color: Color;
}
