import { Compra } from 'src/compra/entities/compra.entity';
import { Factura } from 'src/factura/entities/factura.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TipoPago {
  @PrimaryGeneratedColumn({ name: 'id_tipo_pago' })
  idTipoPago: number;

  @Column({ name: 'descripcion' })
  descripcion: string;

  @Column({ name: 'activo', default: true })
  activo: boolean;

  @Column({
    name: 'fecha_creacion',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaCreacion: Date;

  @OneToMany(() => Factura, (factura) => factura.tipoPago)
  facturas: Factura[];

  @OneToMany(() => Compra, (compra) => compra.tipoPago)
  compras: Compra[];
}
