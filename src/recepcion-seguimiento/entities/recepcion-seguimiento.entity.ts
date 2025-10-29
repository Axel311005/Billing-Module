import { Recepcion } from 'src/recepcion/entities/recepcion.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@Entity()
export class RecepcionSeguimiento {
  @PrimaryGeneratedColumn({ name: 'id_recepcion_seguimiento' })
  idRecepcionSeguimiento: number;

  @ManyToOne(() => Recepcion, (recepcion) => recepcion.seguimientos)
  @JoinColumn({ name: 'id_recepcion' })
  recepcion: Recepcion;

  @Column({ name: 'fecha', type: 'timestamp' })
  fecha: Date;

  @Column({ name: 'estado' })
  estado: string;

  @Column({ name: 'descripcion', nullable: true })
  descripcion: string;
}
