import { User } from 'src/auth/entities/user.entity';
import { Compra } from 'src/compra/entities/compra.entity';
import { Factura } from 'src/factura/entities/factura.entity';
import { Recepcion } from 'src/recepcion/entities/recepcion.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Empleado {
  @PrimaryGeneratedColumn({ name: 'id_empleado' })
  idEmpleado: number;

  @Column({ name: 'primer_nombre' })
  primerNombre: string;

  @Column({ name: 'primer_apellido' })
  primerApellido: string;

  @Column({ name: 'cedula' })
  cedula: string;

  @Column({ name: 'telefono' })
  telefono: string;

  @Column({ name: 'correo' })
  correo: string;

  @Column({ name: 'direccion' })
  direccion: string;

  @Column({
    name: 'fecha_contratacion',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha_contratacion: Date;

  @Column({ name: 'cargo' })
  cargo: string;

  @Column({
    name: 'fecha_creacion',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha_creacion: Date;

  @Column({
    name: 'fecha_ult_modificacion',
    type: 'timestamp',
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  fecha_ult_modificacion: Date;

  @Column({ name: 'activo' })
  activo: boolean;

  @OneToMany(() => Factura, (factura) => factura.empleado)
  facturas: Factura;

  @OneToMany(() => Compra, (compra) => compra.empleado)
  compras: Compra;

  @OneToMany(() => Recepcion, (recepcion) => recepcion.empleado)
  recepciones: Recepcion[];

  @OneToOne(() => User, (user) => user.empleado)
  user: User;
}
