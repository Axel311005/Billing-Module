import { Caja } from 'src/caja/entities/caja.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@Entity()
export class MovimientoCaja {
  @PrimaryGeneratedColumn({ name: 'id_movimiento_caja' })
  idMovimientoCaja: number;

  @Column({ name: 'id_caja' })
  idCaja: number;

  @Column({ name: 'tipo' })
  tipo: string;

  @Column('decimal', { name: 'monto', precision: 10, scale: 2 })
  monto: number;

  @Column({ name: 'descripcion', nullable: true })
  descripcion: string;

  @Column({ name: 'fecha', type: 'timestamp' })
  fecha: Date;

  @Column({ name: 'id_referencia', nullable: true })
  idReferencia: number;

  @Column({ name: 'tipo_referencia', nullable: true })
  tipoReferencia: string;

  @ManyToOne(() => Caja, (caja) => caja.movimientosCaja)
  @JoinColumn({ name: 'id_caja' })
  caja: Caja;
}
