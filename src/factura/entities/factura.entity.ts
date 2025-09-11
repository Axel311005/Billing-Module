import { Bodega } from "src/bodega/entities/bodega.entity";
import { Cliente } from "src/cliente/entities/cliente.entity";
import { FacturaLinea } from "src/factura-linea/entities/factura-linea.entity";
import { Impuesto } from "src/impuesto/entities/impuesto.entity";
import { Moneda } from "src/moneda/entities/moneda.entity";
import { TipoPago } from "src/tipo-pago/entities/tipo-pago.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Factura {

  @PrimaryGeneratedColumn()
  id_factura: number;

  @ManyToOne(() => Cliente, cliente => cliente.facturas)
  cliente: Cliente;

  @ManyToOne(() => TipoPago, tipoPago => tipoPago.facturas)
  tipoPago: TipoPago;

  @ManyToOne(() => Moneda, moneda => moneda.facturas)
  moneda: Moneda;

  @ManyToOne(() => Impuesto, impuesto => impuesto.facturas , {
    nullable : true
  })
  impuesto: Impuesto;

  @ManyToOne(() => Bodega, bodega => bodega.facturas, {
    nullable : true
  })
  bodega : Bodega

  @Column()
  codigoFactura: string;

  @Column({ type: 'timestamp' })
  fecha: Date;

  @Column({ default: false })
  anulada: boolean;

  @Column()
  estado: string;

  @Column('decimal')
  subtotal: number;

  @Column('decimal', {
    nullable : true
  })
  porcentajeDescuento: number;

  @Column('decimal')
  totalDescuento: number;

  @Column('decimal' , {
    nullable : true
  })
  totalImpuesto: number;

  @Column('decimal')
  total: number;

  @Column('decimal')
  tipoCambioUsado: number;

  @Column({ nullable: true })
  comentario: string;

  @OneToMany(() => FacturaLinea, linea => linea.factura)
  lineas: FacturaLinea[];
}
