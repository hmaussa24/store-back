import { IsString, IsNotEmpty } from 'class-validator';

export class CreateColorDto {
  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  codigoColor: string;

  @IsString()
  @IsNotEmpty()
  productoId: number;
}
