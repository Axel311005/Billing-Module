import { Item } from 'src/item/entities/item.entity';
import { Cotizacion } from 'src/cotizacion/entities/cotizacion.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@Entity()
export class DetalleCotizacion {
  @PrimaryGeneratedColumn({ name: 'id_detalle_cotizacion' })
  idDetalleCotizacion: number;

  @Column({ name: 'id_item' })
  idItem: number;

  @Column({ name: 'id_cotizacion' })
  idCotizacion: number;

  @Column('decimal', { name: 'cantidad', precision: 10, scale: 2 })
  cantidad: number;

  @Column('decimal', { name: 'precio_unitario', precision: 10, scale: 2 })
  precioUnitario: number;

  @Column('decimal', { name: 'total_lineas', precision: 10, scale: 2 })
  totalLineas: number;

  @ManyToOne(() => Item, (item) => item.detalleCotizaciones)
  @JoinColumn({ name: 'id_item' })
  item: Item;

  @ManyToOne(() => Cotizacion, (cotizacion) => cotizacion.detalles)
  @JoinColumn({ name: 'id_cotizacion' })
  cotizacion: Cotizacion;
}
