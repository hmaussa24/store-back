import { Injectable } from '@nestjs/common';

@Injectable()
export class WompiService {
  constructor() {}

  async processPayment(compra: {
    referencia: string;
    monto: number;
  }): Promise<{ publicKey: string; integrityHash: string }> {
    if (!compra.referencia || !compra.monto) {
      throw new Error('Referencia y monto son requeridos');
    }
    if (compra.monto <= 0) {
      throw new Error('El monto debe ser mayor a 0');
    }
    return {
      publicKey: process.env.WOMPI_PUBLIC_KEY,
      integrityHash: await this.generateSHA256Hash(
        compra.referencia,
        compra.monto,
        'COP',
      ),
    };
  }

  async generateSHA256Hash(
    referencia: string,
    monto: number,
    moneda: string,
  ): Promise<string> {
    const secretoIntegridad =
      process.env.NODE_ENV === 'production'
        ? process.env.WOMPI_INTEGRITY_KEY
        : process.env.WOMPI_INTEGRITY_KEY_TEST;
    const montoCentavos = monto * 100;
    const montoString = montoCentavos.toString();
    const data = `${referencia}${montoString}${moneda}${secretoIntegridad}`;
    const encondedText = new TextEncoder().encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', encondedText);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
  }
}
// Implement Wompi payment processing methods here
