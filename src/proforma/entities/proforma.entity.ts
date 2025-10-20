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

@Entity()
export class Proforma {
  @PrimaryGeneratedColumn({ name: 'id_proforma' })
  idProforma: number;

  @Column({ name: 'id_tramite_seguro' })
  idTramiteSeguro: number;

  @Column({ name: 'id_seguro', nullable: true })
  idSeguro: number;

  @Column({ name: 'fecha', type: 'timestamp' })
  fecha: Date;

  @Column({ name: 'estado', default: 'pendiente' })
  estado: string;

  @Column({ name: 'observaciones', nullable: true })
  observaciones: string;

  @Column('decimal', { name: 'total_estimado', precision: 10, scale: 2, nullable: true })
  totalEstimado: number;

  @ManyToOne(() => TramiteSeguro, (tramiteSeguro) => tramiteSeguro.proformas)
  @JoinColumn({ name: 'id_tramite_seguro' })
  tramiteSeguro: TramiteSeguro;

  @OneToMany(() => ProformaLineas, (proformaLineas) => proformaLineas.proforma)
  lineas: ProformaLineas[];
}
