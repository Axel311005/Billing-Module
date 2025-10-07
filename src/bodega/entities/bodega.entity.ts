import { Compra } from 'src/compra/entities/compra.entity';
import { ExistenciaBodega } from 'src/existencia-bodega/entities/existencia-bodega.entity';
import { Factura } from 'src/factura/entities/factura.entity';
import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from 'typeorm';

@Entity()
export class Bodega {
  @PrimaryGeneratedColumn({ name: 'id_bodega' })
  idBodega: number;

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

  @OneToMany(() => ExistenciaBodega, (existencia) => existencia.bodega)
  existencias: ExistenciaBodega[];

  @OneToMany(() => Factura, (factura) => factura.bodega)
  facturas: Factura[];

  @OneToMany(() => Compra, (compra) => compra.bodega)
  compras: Compra[];
}
