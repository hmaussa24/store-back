import { Compra } from 'src/compras/compra.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  cedula: string;
  @Column()
  nombre: string;
  @Column()
  email: string;
  @Column()
  telefono: string;
  @Column()
  direccion: string;
  @Column()
  departamento: string;
  @Column()
  ciudad: string;
  @OneToMany(() => Compra, (compra) => compra.client)
  compras: Compra;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
