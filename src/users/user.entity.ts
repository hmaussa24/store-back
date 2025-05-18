import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
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
  @Column()
  password: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
