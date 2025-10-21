import { Bodega } from 'src/bodega/entities/bodega.entity';
import { CompraLinea } from 'src/compra-linea/entities/compra-linea.entity';
import { Consecutivo } from 'src/consecutivo/entities/consecutivo.entity';
import { Empleado } from 'src/empleado/entities/empleado.entity';
import { Impuesto } from 'src/impuesto/entities/impuesto.entity';
import { Moneda } from 'src/moneda/entities/moneda.entity';
import { TipoPago } from 'src/tipo-pago/entities/tipo-pago.entity';
import {
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  OneToMany,
  Entity,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Compra {
  @PrimaryGeneratedColumn({ name: 'id_compra' })
  idCompra: number;

  @ManyToOne(() => Moneda, (moneda) => moneda.compras)
  @JoinColumn({ name: 'id_moneda' })
  moneda: Moneda;

  @ManyToOne(() => TipoPago, (tipoPago) => tipoPago.compras)
  @JoinColumn({ name: 'id_tipo_pago' })
  tipoPago: TipoPago;

  @ManyToOne(() => Impuesto, (impuesto) => impuesto.compras, { nullable: true })
  @JoinColumn({ name: 'id_impuesto' })
  impuesto: Impuesto;

  @ManyToOne(() => Bodega, (bodega) => bodega.compras, { nullable: true })
  @JoinColumn({ name: 'id_bodega' })
  bodega: Bodega;

  @Column({ name: 'codigo_compra' })
  codigoCompra: string;

  @CreateDateColumn({ name: 'fecha', type: 'timestamp' })
  fecha: Date;

  @Column({ name: 'estado' })
  estado: string;

  @Column({ name: 'anulado', default: false })
  anulado: boolean;

  @Column({ name: 'fecha_anulacion', nullable: true })
  fechaAnulacion: Date;

  @Column('decimal', { name: 'subtotal', default: 0 })
  subtotal: number;

  @Column('decimal', { name: 'total_impuesto', nullable: true })
  totalImpuesto: number;

  @Column('decimal', { name: 'porcentaje_descuento', nullable: true })
  porcentajeDescuento: number;

  @Column('decimal', { name: 'total_descuento', nullable: true })
  totalDescuento: number;

  @Column('decimal', { name: 'total' })
  total: number;

  @Column('decimal', { name: 'tipo_cambio_usado' })
  tipoCambioUsado: number;

  @Column({ name: 'comentario', nullable: true })
  comentario: string;

  @OneToMany(() => CompraLinea, (linea) => linea.compra)
  lineas: CompraLinea[];

  @ManyToOne(() => Consecutivo, (consecutivo) => consecutivo.compras)
  @JoinColumn({ name: 'id_consecutivo' })
  consecutivo: Consecutivo;

  @ManyToOne(() => Empleado, (empleado) => empleado.compras)
  @JoinColumn({ name: 'id_empleado' })
  empleado: Empleado;
}
