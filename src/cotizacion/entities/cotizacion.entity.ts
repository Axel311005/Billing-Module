import { Cliente } from 'src/cliente/entities/cliente.entity';
import { DetalleCotizacion } from 'src/detalle-cotizacion/entities/detalle-cotizacion.entity';
import { Consecutivo } from 'src/consecutivo/entities/consecutivo.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Cotizacion {
  @PrimaryGeneratedColumn({ name: 'id_cotizacion' })
  idCotizacion: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.cotizaciones)
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;

  @ManyToOne(() => Consecutivo)
  @JoinColumn({ name: 'id_consecutivo' })
  consecutivo: Consecutivo;

  @Column({ name: 'codigo_cotizacion' })
  codigoCotizacion: string;

  @Column({
    name: 'fecha',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha: Date;

  @Column({ name: 'estado', default: 'pendiente' })
  estado: string;

  @Column('decimal', {
    name: 'total',
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  total: number;

  @Column({ name: 'nombre_cliente' })
  nombreCliente: string;

  @OneToMany(
    () => DetalleCotizacion,
    (detalleCotizacion) => detalleCotizacion.cotizacion,
  )
  detalles: DetalleCotizacion[];
}
