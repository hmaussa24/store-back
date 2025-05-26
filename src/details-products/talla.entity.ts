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
export class Talla {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  talla: string;
  @ManyToOne(() => Producto, (producto) => producto.tallas)
  producto: Producto;
  @OneToMany(() => Compra, (compra) => compra.talla)
  compras: Compra[];
  @Column()
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
