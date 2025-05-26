import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTallaDto {
  @IsString()
  @IsNotEmpty()
  talla: string;

  @IsNotEmpty()
  productoId: number;
}
