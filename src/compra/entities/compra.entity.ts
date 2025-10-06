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
} from 'typeorm';

@Entity()
export class Compra {
  @PrimaryGeneratedColumn()
  idCompra: number;

  @ManyToOne(() => Moneda, (moneda) => moneda.compras)
  moneda: Moneda;

  @ManyToOne(() => TipoPago, (tipoPago) => tipoPago.compras)
  tipoPago: TipoPago;

  @ManyToOne(() => Impuesto, (impuesto) => impuesto.compras, {
    nullable: true,
  })
  impuesto: Impuesto;

  @ManyToOne(() => Bodega, (bodega) => bodega.compras, {
    nullable: true,
  })
  bodega: Bodega;

  @Column()
  codigoCompra: string;

  @CreateDateColumn({ type: 'timestamp' })
  fecha: Date;

  @Column()
  estado: string;

  @Column({ default: false })
  anulado: boolean;

  @Column({ nullable: true })
  fechaAnulacion: Date;

  @Column('decimal')
  subtotal: number;

  @Column('decimal', {
    nullable: true,
  })
  totalImpuesto: number;

  @Column('decimal', {
    nullable: true,
  })
  porcentajeDescuento: number;

  @Column('decimal', {
    nullable: true,
  })
  totalDescuento: number;

  @Column('decimal')
  total: number;

  @Column('decimal')
  tipoCambioUsado: number;

  @Column({ nullable: true })
  comentario: string;

  @OneToMany(() => CompraLinea, (linea) => linea.compra)
  lineas: CompraLinea[];

  @ManyToOne(() => Consecutivo, (consecutivo) => consecutivo.compras)
  consecutivo: Consecutivo;

  @ManyToOne(() => Empleado, (empleado) => empleado.compras)
  empleado: Empleado;
}
