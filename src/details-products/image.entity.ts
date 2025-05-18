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
export class Imagen {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  url: string;
  @ManyToOne(() => Producto, (producto) => producto.imagenes)
  productos: Producto;
  @Column()
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
