import { IsString, IsNotEmpty } from 'class-validator';

export class CreateImagenDto {
  @IsString()
  @IsNotEmpty()
  url: string;
  @IsString()
  @IsNotEmpty()
  productosId: number;
}
