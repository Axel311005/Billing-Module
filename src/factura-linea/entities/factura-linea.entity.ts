import { Factura } from 'src/factura/entities/factura.entity';
import { Item } from 'src/item/entities/item.entity';
import {
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Entity,
  JoinColumn,
} from 'typeorm';

@Entity()
export class FacturaLinea {
  @PrimaryGeneratedColumn({ name: 'id_factura_linea' })
  idFacturaLinea: number;

  @ManyToOne(() => Factura, (factura) => factura.lineas)
  @JoinColumn({ name: 'id_factura' })
  factura: Factura;

  @ManyToOne(() => Item, (item) => item.facturaLineas)
  @JoinColumn({ name: 'id_item' })
  item: Item;

  @Column('decimal', { name: 'cantidad' })
  cantidad: number;

  @Column('decimal', { name: 'precio_unitario' })
  precioUnitario: number;

  @Column('decimal', { name: 'total_linea' })
  totalLinea: number;
}
