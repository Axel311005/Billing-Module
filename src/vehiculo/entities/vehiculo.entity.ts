import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Cita } from 'src/cita/entities/cita.entity';
import { Recepcion } from 'src/recepcion/entities/recepcion.entity';
import { TramiteSeguro } from 'src/tramite-seguro/entities/tramite-seguro.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Vehiculo {
  @PrimaryGeneratedColumn({ name: 'id_vehiculo' })
  idVehiculo: number;

  @Column({ name: 'id_cliente' })
  idCliente: number;

  @Column({ name: 'placa' })
  placa: string;

  @Column({ name: 'motor', nullable: true })
  motor: string;

  @Column({ name: 'marca' })
  marca: string;

  @Column({ name: 'anio' })
  anio: number;

  @Column({ name: 'modelo' })
  modelo: string;

  @Column({ name: 'color', nullable: true })
  color: string;

  @Column({ name: 'num_chasis', nullable: true })
  numChasis: string;

  @Column({
    name: 'fecha_creacion',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaCreacion: Date;

  @ManyToOne(() => Cliente, (cliente) => cliente.vehiculos)
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;

  @OneToMany(() => Cita, (cita) => cita.vehiculo)
  citas: Cita[];

  @OneToMany(() => Recepcion, (recepcion) => recepcion.vehiculo)
  recepciones: Recepcion[];

  @OneToMany(() => TramiteSeguro, (tramiteSeguro) => tramiteSeguro.vehiculo)
  tramitesSeguro: TramiteSeguro[];
}
