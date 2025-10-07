import { User } from 'src/auth/entities/user.entity';
import { Factura } from 'src/factura/entities/factura.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn({ name: 'id_cliente' })
  idCliente: number;

  @Column({ name: 'nombre' })
  nombre: string;

  @Column({ name: 'ruc' })
  ruc: string;

  @Column({ name: 'es_exonerado', default: false })
  esExonerado: boolean;

  @Column('decimal', {
    name: 'porcentaje_exonerado',
    nullable: true,
    default: 0,
  })
  porcentajeExonerado: number;

  @Column({ name: 'direccion', nullable: true })
  direccion: string;

  @Column({ name: 'telefono', nullable: true })
  telefono: string;

  @Column({ name: 'activo', default: true })
  activo: boolean;

  @Column({ name: 'notas', nullable: true })
  notas: string;

  @Column({ name: 'fecha_ult_modif', type: 'timestamp', nullable: true })
  fechaUltModif: Date;

  @Column({
    name: 'fecha_creacion',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaCreacion: Date;

  @OneToMany(() => Factura, (factura) => factura.cliente)
  facturas: Factura;

  @OneToOne(() => User, (user) => user.cliente)
  user: User;
}
