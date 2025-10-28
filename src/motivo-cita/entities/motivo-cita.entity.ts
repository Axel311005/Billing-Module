import { Cita } from 'src/cita/entities/cita.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class MotivoCita {
  @PrimaryGeneratedColumn({ name: 'id_motivo_cita' })
  idMotivoCita: number;

  @Column({ name: 'descripcion' })
  descripcion: string;

  @OneToMany(() => Cita, (cita) => cita.motivoCita)
  citas: Cita[];
}




