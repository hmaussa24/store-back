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
export class Categotia {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  codigo: string;
  @Column()
  nombre: string;
  @OneToMany(() => Producto, (producto) => producto.categorias)
  producto: Producto;
  @Column()
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
