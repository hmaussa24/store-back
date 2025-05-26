import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsNumber()
  @IsNotEmpty()
  precioPublico: number;

  @IsNumber()
  @IsNotEmpty()
  precioProveedor: number;

  @IsNumber()
  @IsNotEmpty()
  descuento: number;

  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @IsNumber()
  @IsNotEmpty()
  categoriasId: number;
}
