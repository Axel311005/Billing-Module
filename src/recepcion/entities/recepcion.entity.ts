import { Vehiculo } from 'src/vehiculo/entities/vehiculo.entity';
import { Empleado } from 'src/empleado/entities/empleado.entity';
import { RecepcionSeguimiento } from 'src/recepcion-seguimiento/entities/recepcion-seguimiento.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Recepcion {
  @PrimaryGeneratedColumn({ name: 'id_recepcion' })
  idRecepcion: number;

  @Column({ name: 'id_vehiculo' })
  idVehiculo: number;

  @Column({ name: 'id_empleado' })
  idEmpleado: number;

  @Column({ name: 'fecha_recepcion', type: 'timestamp' })
  fechaRecepcion: Date;

  @Column({ name: 'observaciones', nullable: true })
  observaciones: string;

  @Column({ name: 'estado', default: 'recibido' })
  estado: string;

  @Column({ name: 'codigo_recepcion' })
  codigoRecepcion: string;

  @Column({ name: 'fecha_entrega_estimada', type: 'timestamp', nullable: true })
  fechaEntregaEstimada: Date;

  @Column({ name: 'fecha_entrega_real', type: 'timestamp', nullable: true })
  fechaEntregaReal: Date;

  @ManyToOne(() => Vehiculo, (vehiculo) => vehiculo.recepciones)
  @JoinColumn({ name: 'id_vehiculo' })
  vehiculo: Vehiculo;

  @ManyToOne(() => Empleado, (empleado) => empleado.recepciones)
  @JoinColumn({ name: 'id_empleado' })
  empleado: Empleado;

  @OneToMany(() => RecepcionSeguimiento, (recepcionSeguimiento) => recepcionSeguimiento.recepcion)
  seguimientos: RecepcionSeguimiento[];
}
