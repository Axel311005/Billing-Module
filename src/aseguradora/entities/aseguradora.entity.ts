import { TramiteSeguro } from 'src/tramite-seguro/entities/tramite-seguro.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Aseguradora {
  @PrimaryGeneratedColumn({ name: 'id_aseguradora' })
  idAseguradora: number;

  @Column({ name: 'descripcion' })
  descripcion: string;

  @Column({ name: 'telefono', nullable: true })
  telefono: string;

  @Column({ name: 'direccion', nullable: true })
  direccion: string;

  @Column({ name: 'contacto', nullable: true })
  contacto: string;

  @Column({ name: 'activo', default: true })
  activo: boolean;

  @OneToMany(() => TramiteSeguro, (tramiteSeguro) => tramiteSeguro.aseguradora)
  tramitesSeguro: TramiteSeguro[];
}





