import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateCompraDto {
  @IsString()
  @IsNotEmpty()
  referencia: string;

  @IsString()
  @IsNotEmpty()
  cantidad: string;

  @IsString()
  @IsNotEmpty()
  estado:
    | 'Pendiente'
    | 'Pagado'
    | 'Cancelado'
    | 'Entregado'
    | 'Enviado'
    | 'Enviado-Contraentrega';

  @IsNumber()
  @IsNotEmpty()
  descuento: number;

  @IsNumber()
  @IsNotEmpty()
  clientId: number;

  @IsNumber()
  @IsNotEmpty()
  productoId: number;

  @IsNumber()
  @IsNotEmpty()
  tallaId: number;

  @IsNumber()
  @IsNotEmpty()
  colorId: number;

  @IsString()
  @IsNotEmpty()
  metodoPago: 'contraentrega' | 'transferencia';

  @IsString()
  @IsNotEmpty()
  departamento: string;

  @IsString()
  @IsNotEmpty()
  ciudad: string;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsString()
  transferenciaId?: string;
}
