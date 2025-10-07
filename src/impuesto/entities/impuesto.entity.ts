import { Compra } from 'src/compra/entities/compra.entity';
import { Factura } from 'src/factura/entities/factura.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Impuesto {
  @PrimaryGeneratedColumn({ name: 'id_impuesto' })
  idImpuesto: number;

  @Column({ name: 'descripcion' })
  descripcion: string;

  @Column('decimal', { name: 'porcentaje' })
  porcentaje: number;

  @Column({ name: 'activo', default: true })
  activo: boolean;

  @Column({
    name: 'fecha_creacion',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaCreacion: Date;

  @OneToMany(() => Factura, (factura) => factura.impuesto)
  facturas: Factura[];

  @OneToMany(() => Compra, (compra) => compra.impuesto)
  compras: Compra[];
}
