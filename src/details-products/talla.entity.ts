import { Producto } from 'src/products/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
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
  @OneToMany(() => Producto, (producto) => producto.tallas)
  producto: Producto;
  @Column()
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
