import { TramiteSeguro } from 'src/tramite-seguro/entities/tramite-seguro.entity';
import { ProformaLineas } from 'src/proforma-lineas/entities/proforma-lineas.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Consecutivo } from 'src/consecutivo/entities/consecutivo.entity';
import { Moneda } from 'src/moneda/entities/moneda.entity';
import { Impuesto } from 'src/impuesto/entities/impuesto.entity';

@Entity()
export class Proforma {
  @PrimaryGeneratedColumn({ name: 'id_proforma' })
  idProforma: number;

  @ManyToOne(() => TramiteSeguro, (tramiteSeguro) => tramiteSeguro.proformas)
  @JoinColumn({ name: 'id_tramite_seguro' })
  tramiteSeguro: TramiteSeguro;

  @ManyToOne(() => Consecutivo, (consecutivo) => consecutivo.proformas)
  @JoinColumn({ name: 'id_consecutivo' })
  consecutivo: Consecutivo;

  @ManyToOne(() => Moneda, (moneda) => moneda.proformas)
  @JoinColumn({ name: 'id_moneda' })
  moneda: Moneda;

  @ManyToOne(() => Impuesto, (impuesto) => impuesto.proformas, {
    nullable: true,
  })
  @JoinColumn({ name: 'id_impuesto' })
  impuesto?: Impuesto | null;

  @Column({ name: 'codigo_proforma', nullable: true })
  codigoProforma: string;

  @Column({
    name: 'fecha',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha: Date;

  @Column({ name: 'subtotal', default: 0 })
  subtotal: number;

  @Column({ name: 'total_impuesto', default: 0 })
  totalImpuesto: number;

  // @Column({ name: 'estado', default: 'pendiente' })
  // estado: string;

  @Column({ name: 'observaciones', nullable: true })
  observaciones: string;

  @Column('decimal', {
    name: 'total_estimado',
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  totalEstimado?: number;

  @OneToMany(() => ProformaLineas, (proformaLineas) => proformaLineas.proforma)
  lineas: ProformaLineas[];
}
