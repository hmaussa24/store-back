import { Color } from 'src/details-products/color.entity';
import { Categotia } from 'src/details-products/cotegoria.entity';
import { Imagen } from 'src/details-products/image.entity';
import { Talla } from 'src/details-products/talla.entity';
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
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  codigo: string;
  @Column()
  nombre: string;
  @Column()
  descripcion: string;
  @Column()
  precioPublico: number;
  @Column()
  precioProveedor: number;
  @Column()
  descuento: number;
  @Column()
  stock: number;
  @Column()
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @ManyToOne(() => Color, (color) => color.producto)
  colors: Color;
  @ManyToOne(() => Categotia, (categoria) => categoria.producto)
  categorias: Categotia;
  @ManyToOne(() => Talla, (talla) => talla.producto)
  tallas: Talla;
  @OneToMany(() => Imagen, (imagen) => imagen.productos)
  imagenes: Imagen[];
}
