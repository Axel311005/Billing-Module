import { MovimientoCaja } from 'src/movimiento-caja/entities/movimiento-caja.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Caja {
  @PrimaryGeneratedColumn({ name: 'id_caja' })
  idCaja: number;

  @Column({ name: 'fecha_apertura', type: 'timestamp' })
  fechaApertura: Date;

  @Column({ name: 'fecha_cierre', type: 'timestamp', nullable: true })
  fechaCierre: Date;

  @Column('decimal', { name: 'saldo_inicial', precision: 10, scale: 2 })
  saldoInicial: number;

  @Column('decimal', { name: 'saldo_final', precision: 10, scale: 2, nullable: true })
  saldoFinal: number;

  @Column({ name: 'estado', default: 'abierta' })
  estado: string;

  @OneToMany(() => MovimientoCaja, (movimientoCaja) => movimientoCaja.caja)
  movimientosCaja: MovimientoCaja[];
}

