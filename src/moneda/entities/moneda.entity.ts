import { Compra } from 'src/compra/entities/compra.entity';
import { Factura } from 'src/factura/entities/factura.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Moneda {
  @PrimaryGeneratedColumn({ name: 'id_moneda' })
  idMoneda: number;

  @Column({ name: 'descripcion' })
  descripcion: string;

  @Column('decimal', { name: 'tipo_cambio' })
  tipoCambio: number;

  @Column({ name: 'activo', default: true })
  activo: boolean;

  @Column({
    name: 'fecha_creacion',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaCreacion: Date;

  @OneToMany(() => Factura, (factura) => factura.moneda)
  facturas: Factura;

  @OneToMany(() => Compra, (compra) => compra.moneda)
  compras: Compra;
}
