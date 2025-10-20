import { Proforma } from 'src/proforma/entities/proforma.entity';
import { Item } from 'src/item/entities/item.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@Entity()
export class ProformaLineas {
  @PrimaryGeneratedColumn({ name: 'id_proforma_lineas' })
  idProformaLineas: number;

  @Column({ name: 'id_proforma' })
  idProforma: number;

  @Column({ name: 'id_item' })
  idItem: number;

  @Column('decimal', { name: 'cantidad', precision: 10, scale: 2 })
  cantidad: number;

  @Column('decimal', { name: 'precio_unitario', precision: 10, scale: 2 })
  precioUnitario: number;

  @Column('decimal', { name: 'total_linea', precision: 10, scale: 2 })
  totalLinea: number;

  @ManyToOne(() => Proforma, (proforma) => proforma.lineas)
  @JoinColumn({ name: 'id_proforma' })
  proforma: Proforma;

  @ManyToOne(() => Item, (item) => item.proformaLineas)
  @JoinColumn({ name: 'id_item' })
  item: Item;
}
