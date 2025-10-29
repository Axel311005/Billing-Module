import { Vehiculo } from 'src/vehiculo/entities/vehiculo.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Aseguradora } from 'src/aseguradora/entities/aseguradora.entity';
import { Proforma } from 'src/proforma/entities/proforma.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@Entity()
export class TramiteSeguro {
  @PrimaryGeneratedColumn({ name: 'id_tramite_seguro' })
  idTramiteSeguro: number;

  @ManyToOne(() => Vehiculo, (vehiculo) => vehiculo.tramitesSeguro)
  @JoinColumn({ name: 'id_vehiculo' })
  vehiculo: Vehiculo;

  @ManyToOne(() => Cliente, (cliente) => cliente.tramitesSeguro)
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;

  @ManyToOne(() => Aseguradora, (aseguradora) => aseguradora.tramitesSeguro)
  @JoinColumn({ name: 'id_aseguradora' })
  aseguradora: Aseguradora;

  @Column({ name: 'numero_tramite' })
  numeroTramite: string;

  @Column({ name: 'estado', default: 'iniciado' })
  estado: string;

  @Column({ name: 'fecha_inicio', type: 'timestamp' })
  fechaInicio: Date;

  @Column({ name: 'fecha_fin', type: 'timestamp', nullable: true })
  fechaFin: Date;

  @Column({ name: 'observaciones', nullable: true })
  observaciones: string;

  @OneToMany(() => Proforma, (proforma) => proforma.tramiteSeguro)
  proformas: Proforma[];
}
