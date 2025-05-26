import { Compra } from 'src/compras/compra.entity';
import { Producto } from 'src/products/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Color {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  color: string;
  @Column()
  codigoColor: string;
  @ManyToOne(() => Producto, (producto) => producto.colors)
  producto: Producto;
  @OneToMany(() => Compra, (compra) => compra.color)
  compras: Compra[];
  @Column()
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
