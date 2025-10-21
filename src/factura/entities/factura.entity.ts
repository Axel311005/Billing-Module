import { Bodega } from 'src/bodega/entities/bodega.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Consecutivo } from 'src/consecutivo/entities/consecutivo.entity';
import { Empleado } from 'src/empleado/entities/empleado.entity';
import { FacturaLinea } from 'src/factura-linea/entities/factura-linea.entity';
import { Impuesto } from 'src/impuesto/entities/impuesto.entity';
import { Moneda } from 'src/moneda/entities/moneda.entity';
import { TipoPago } from 'src/tipo-pago/entities/tipo-pago.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Factura {
  @PrimaryGeneratedColumn({ name: 'id_factura' })
  id_factura: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.facturas)
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;

  @ManyToOne(() => TipoPago, (tipoPago) => tipoPago.facturas)
  @JoinColumn({ name: 'id_tipo_pago' })
  tipoPago: TipoPago;

  @ManyToOne(() => Moneda, (moneda) => moneda.facturas)
  @JoinColumn({ name: 'id_moneda' })
  moneda: Moneda;

  @ManyToOne(() => Impuesto, (impuesto) => impuesto.facturas, {
    nullable: true,
  })
  @JoinColumn({ name: 'id_impuesto' })
  impuesto: Impuesto;

  @ManyToOne(() => Bodega, (bodega) => bodega.facturas, {
    nullable: true,
  })
  @JoinColumn({ name: 'id_bodega' })
  bodega: Bodega;

  @Column({ name: 'codigo_factura' })
  codigoFactura: string;

  @CreateDateColumn({ name: 'fecha', type: 'timestamp' })
  fecha: Date;

  @Column({ name: 'anulada', default: false })
  anulada: boolean;

  @Column({ name: 'fecha_anulacion', nullable: true, default: null })
  fechaAnulacion: Date;

  @Column({ name: 'estado' })
  estado: string;

  @Column('decimal', { name: 'subtotal', default: 0 })
  subtotal: number;

  @Column('decimal', {
    name: 'porcentaje_descuento',
    nullable: true,
    default: 0,
  })
  porcentajeDescuento: number;

  @Column('decimal', { name: 'total_descuento', default: 0 })
  totalDescuento: number;

  @Column('decimal', {
    name: 'total_impuesto',
    nullable: true,
    default: 0,
  })
  totalImpuesto: number;

  @Column('decimal', { name: 'total', default: 0 })
  total: number;

  @Column('decimal', { name: 'tipo_cambio_usado' })
  tipoCambioUsado: number;

  @Column({ name: 'comentario', nullable: true })
  comentario: string;

  @OneToMany(() => FacturaLinea, (linea) => linea.factura)
  lineas: FacturaLinea[];

  @ManyToOne(() => Consecutivo, (consecutivo) => consecutivo.facturas)
  @JoinColumn({ name: 'id_consecutivo' })
  consecutivo: Consecutivo;

  @ManyToOne(() => Empleado, (empleado) => empleado.facturas)
  @JoinColumn({ name: 'id_empleado' })
  empleado: Empleado;
}
