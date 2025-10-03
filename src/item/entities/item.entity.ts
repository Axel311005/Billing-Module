import { ClasificacionItem } from 'src/clasificacion-item/entities/clasificacion-item.entity';
import { CompraLinea } from 'src/compra-linea/entities/compra-linea.entity';
import { ExistenciaBodega } from 'src/existencia-bodega/entities/existencia-bodega.entity';
import { FacturaLinea } from 'src/factura-linea/entities/factura-linea.entity';
import { UnidadMedida } from 'src/unidad-medida/entities/unidad-medida.entity';
import {
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  OneToMany,
  Entity,
} from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  idItem: number;

  @ManyToOne(() => ClasificacionItem, (clasificacion) => clasificacion.items)
  clasificacion: ClasificacionItem;

  @ManyToOne(() => UnidadMedida, (unidad) => unidad.items)
  unidadMedida: UnidadMedida;

  @Column()
  codigoItem: string;

  @Column()
  descripcion: string;

  @Column()
  tipo: string;

  @Column('decimal')
  precioBaseLocal: number;

  @Column('decimal')
  precioBaseDolar: number;

  @Column('decimal')
  precioAdquisicionLocal: number;

  @Column('decimal')
  precioAdquisicionDolar: number;

  @Column({ default: false })
  esCotizable: boolean;

  @Column({ type: 'timestamp', nullable: true })
  ultimaSalida: Date;

  @Column({ type: 'timestamp', nullable: true })
  ultimoIngreso: Date;

  @Column({ nullable: true })
  usuarioUltModif: string;

  @Column({ type: 'timestamp', nullable: true })
  fechaUltModif: Date;

  @Column({ default: false })
  perecedero: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion: Date;

  @Column({ default: true })
  activo: boolean;

  @OneToMany(() => FacturaLinea, (linea) => linea.item)
  facturaLineas: FacturaLinea[];

  @OneToMany(() => CompraLinea, (linea) => linea.item)
  compraLineas: CompraLinea[];

  @OneToMany(() => ExistenciaBodega, (existencia) => existencia.item)
  existencias: ExistenciaBodega[];
}
