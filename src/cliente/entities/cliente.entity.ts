import { Factura } from 'src/factura/entities/factura.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  idCliente: number;

  @Column()
  nombre: string;

  @Column()
  ruc: string;

  @Column({ default: false })
  esExonerado: boolean;

  @Column('decimal', { nullable: true, default: 0 })
  porcentajeExonerado: number;

  @Column({ nullable: true })
  direccion: string;

  @Column({ nullable: true })
  telefono: string;

  @Column({ default: true })
  activo: boolean;

  @Column({ nullable: true })
  notas: string;

  @Column({ type: 'timestamp', nullable: true })
  fechaUltModif: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion: Date;

  @OneToMany(() => Factura, (factura) => factura.cliente)
  facturas: Factura;
}
