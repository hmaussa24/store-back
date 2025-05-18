import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoriaDto {
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;
}
