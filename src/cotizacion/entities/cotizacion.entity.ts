import { Cliente } from 'src/cliente/entities/cliente.entity';
import { DetalleCotizacion } from 'src/detalle-cotizacion/entities/detalle-cotizacion.entity';
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

  @Column({ name: 'id_cliente' })
  idCliente: number;

  @Column({ name: 'fecha', type: 'timestamp' })
  fecha: Date;

  @Column({ name: 'estado', default: 'pendiente' })
  estado: string;

  @Column('decimal', { name: 'total', precision: 10, scale: 2, nullable: true })
  total: number;

  @Column({ name: 'nombre_cliente' })
  nombreCliente: string;

  @ManyToOne(() => Cliente, (cliente) => cliente.cotizaciones)
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;

  @OneToMany(() => DetalleCotizacion, (detalleCotizacion) => detalleCotizacion.cotizacion)
  detalles: DetalleCotizacion[];
}
