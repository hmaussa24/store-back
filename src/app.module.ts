import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from './clientes/clientes.module';
import { ProductosModule } from './products/productos.module';
import { DetailsProductsModule } from './details-products/details-products.module';
import { CategoriasModule } from './details-products/categorias.module';
import { ImagenesModule } from './details-products/imagenes.module';
import { TallasModule } from './details-products/tallas.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ComprasModule } from './compras/compras.module';
import { WompiModule } from './wompi/wompi.module';
import { UrlModule } from './url/url.module';
import { WhatsAppModule } from './meta/whatsapp.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ClientesModule,
    ProductosModule,
    DetailsProductsModule,
    CategoriasModule,
    ImagenesModule,
    TallasModule,
    UsersModule,
    AuthModule,
    ComprasModule,
    WompiModule,
    UrlModule,
    WhatsAppModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
