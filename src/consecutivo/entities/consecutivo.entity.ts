import { Compra } from 'src/compra/entities/compra.entity';
import { Factura } from 'src/factura/entities/factura.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('consecutivo')
export class Consecutivo {
  @PrimaryGeneratedColumn({ name: 'id_consecutivo' })
  idConsecutivo: number;

  @Column({ name: 'descripcion', type: 'varchar', length: 100 })
  descripcion: string;

  @Column({ name: 'activo', default: true })
  activo: boolean;

  @Column({ name: 'longitud', type: 'int' })
  longitud: number;

  @Column({ name: 'documento', type: 'varchar', length: 20 })
  documento: string;

  @Column({ name: 'mascara', type: 'varchar', length: 20, nullable: true })
  mascara: string;

  @Column({ name: 'valor_inicial', type: 'int' })
  valorInicial: number;

  @Column({ name: 'valor_final', type: 'int' })
  valorFinal: number;

  @Column({ name: 'ultimo_valor', type: 'int' })
  ultimoValor: number;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_ult', type: 'timestamp' })
  fechaUlt: Date;

  @OneToMany(() => Factura, (factura) => factura.consecutivo)
  facturas: Factura[];

  @OneToMany(() => Compra, (compra) => compra.consecutivo)
  compras: Compra[];
}
