import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { ItemModule } from './item/item.module';
import { BodegaModule } from './bodega/bodega.module';
import { FacturaModule } from './factura/factura.module';
import { CompraModule } from './compra/compra.module';
import { CompraLineaModule } from './compra-linea/compra-linea.module';
import { FacturaLineaModule } from './factura-linea/factura-linea.module';
import { ImpuestoModule } from './impuesto/impuesto.module';
import { MonedaModule } from './moneda/moneda.module';
import { TipoPagoModule } from './tipo-pago/tipo-pago.module';
import { ExistenciaBodegaModule } from './existencia-bodega/existencia-bodega.module';
import { ClasificacionItemModule } from './clasificacion-item/clasificacion-item.module';
import { AuthModule } from './auth/auth.module';
import { UnidadMedidaModule } from './unidad-medida/unidad-medida.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      ssl: process.env.STAGE === 'prod',
      extra:  {
        ssl: process.env.STAGE === 'prod' 
        ? {rejectUnauthorized: false}
        : null
      },
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    

    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..', 'public',)
    }) ,
    
    ClienteModule, 
    ItemModule, 
    BodegaModule, 
    FacturaModule, 
    CompraModule, 
    CompraLineaModule, 
    FacturaLineaModule, 
    ImpuestoModule, 
    MonedaModule, 
    TipoPagoModule, 
    ExistenciaBodegaModule, 
    ClasificacionItemModule, 
    AuthModule, 
    UnidadMedidaModule
  ],
  
  
})
export class AppModule {}
