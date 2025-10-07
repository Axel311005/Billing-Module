import { Compra } from 'src/compra/entities/compra.entity';
import { Item } from 'src/item/entities/item.entity';
import {
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Entity,
  JoinColumn,
} from 'typeorm';

@Entity()
export class CompraLinea {
  @PrimaryGeneratedColumn({ name: 'id_compra_linea' })
  idCompraLinea: number;

  @ManyToOne(() => Compra, (compra) => compra.lineas)
  @JoinColumn({ name: 'id_compra' })
  compra: Compra;

  @ManyToOne(() => Item, (item) => item.compraLineas)
  @JoinColumn({ name: 'id_item' })
  item: Item;

  @Column('decimal', { name: 'cantidad' })
  cantidad: number;

  @Column('decimal', { name: 'precio_unitario' })
  precioUnitario: number;

  @Column('decimal', { name: 'total_linea' })
  totalLinea: number;
}
