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
  JoinColumn,
} from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn({ name: 'id_item' })
  idItem: number;

  @ManyToOne(() => ClasificacionItem, (clasificacion) => clasificacion.items)
  @JoinColumn({ name: 'id_clasificacion' })
  clasificacion: ClasificacionItem;

  @ManyToOne(() => UnidadMedida, (unidad) => unidad.items)
  @JoinColumn({ name: 'id_unidad_medida' })
  unidadMedida: UnidadMedida;

  @Column({ name: 'codigo_item' })
  codigoItem: string;

  @Column({ name: 'descripcion' })
  descripcion: string;

  @Column({ name: 'tipo' })
  tipo: string;

  @Column('decimal', { name: 'precio_base_local' })
  precioBaseLocal: number;

  @Column('decimal', { name: 'precio_base_dolar' })
  precioBaseDolar: number;

  @Column('decimal', { name: 'precio_adquisicion_local' })
  precioAdquisicionLocal: number;

  @Column('decimal', { name: 'precio_adquisicion_dolar' })
  precioAdquisicionDolar: number;

  @Column({ name: 'es_cotizable', default: false })
  esCotizable: boolean;

  @Column({ name: 'ultima_salida', type: 'timestamp', nullable: true })
  ultimaSalida: Date;

  @Column({ name: 'ultimo_ingreso', type: 'timestamp', nullable: true })
  ultimoIngreso: Date;

  @Column({ name: 'usuario_ult_modif', nullable: true })
  usuarioUltModif: string;

  @Column({ name: 'fecha_ult_modif', type: 'timestamp', nullable: true })
  fechaUltModif: Date;

  @Column({ name: 'perecedero', default: false })
  perecedero: boolean;

  @Column({
    name: 'fecha_creacion',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaCreacion: Date;

  @Column({ name: 'activo', default: true })
  activo: boolean;

  @OneToMany(() => FacturaLinea, (linea) => linea.item)
  facturaLineas: FacturaLinea[];

  @OneToMany(() => CompraLinea, (linea) => linea.item)
  compraLineas: CompraLinea[];

  @OneToMany(() => ExistenciaBodega, (existencia) => existencia.item)
  existencias: ExistenciaBodega[];
}
