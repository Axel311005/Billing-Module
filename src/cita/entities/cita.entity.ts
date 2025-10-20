import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Vehiculo } from 'src/vehiculo/entities/vehiculo.entity';
import { MotivoCita } from 'src/motivo-cita/entities/motivo-cita.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Cita {
  @PrimaryGeneratedColumn('uuid', { name: 'unique_id' })
  uniqueId: string;

  @Column({ name: 'id_cliente' })
  idCliente: number;

  @Column({ name: 'id_vehiculo' })
  idVehiculo: number;

  @Column({ name: 'id_motivo_cita' })
  idMotivoCita: number;

  @Column({ name: 'fecha_inicio', type: 'timestamp' })
  fechaInicio: Date;

  @Column({ name: 'fecha_fin', type: 'timestamp' })
  fechaFin: Date;

  @Column({ name: 'estado', default: 'programada' })
  estado: string;

  @Column({ name: 'canal', nullable: true })
  canal: string;

  @Column({
    name: 'fecha_creacion',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaCreacion: Date;

  @Column({
    name: 'fecha_actualizacion',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaActualizacion: Date;

  @ManyToOne(() => Cliente, (cliente) => cliente.citas)
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;

  @ManyToOne(() => Vehiculo, (vehiculo) => vehiculo.citas)
  @JoinColumn({ name: 'id_vehiculo' })
  vehiculo: Vehiculo;

  @ManyToOne(() => MotivoCita, (motivoCita) => motivoCita.citas)
  @JoinColumn({ name: 'id_motivo_cita' })
  motivoCita: MotivoCita;
}
