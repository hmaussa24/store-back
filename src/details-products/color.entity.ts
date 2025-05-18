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
export class Color {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  color: string;
  @Column()
  codigoColor: string;
  @OneToMany(() => Producto, (producto) => producto.colors)
  producto: Producto;
  @Column()
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
