import { User } from 'src/auth/entities/user.entity';
import { Compra } from 'src/compra/entities/compra.entity';
import { Factura } from 'src/factura/entities/factura.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Empleado {
  @PrimaryGeneratedColumn()
  idEmpleado: number;

  @Column()
  primerNombre: string;

  @Column()
  primerApellido: string;

  @Column()
  cedula: string;

  @Column()
  telefono: string;

  @Column()
  correo: string;

  @Column()
  direccion: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_contratacion: Date;

  @Column()
  cargo: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @Column({ type: 'timestamp' })
  fecha_ult_modificacion: Date;

  @Column()
  activo: boolean;

  @OneToMany(() => Factura, (factura) => factura.empleado)
  facturas: Factura;

  @OneToMany(() => Compra, (compra) => compra.empleado)
  compras: Compra;

  @OneToOne(() => User, (user) => user.empleado)
  user: User;
}
