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

  @ManyToOne(() => Proforma, (proforma) => proforma.lineas)
  @JoinColumn({ name: 'id_proforma' })
  proforma: Proforma;

  @ManyToOne(() => Item, (item) => item.proformaLineas)
  @JoinColumn({ name: 'id_item' })
  item: Item;

  @Column('decimal', { name: 'cantidad' })
  cantidad: number;

  @Column('decimal', { name: 'precio_unitario' })
  precioUnitario: number;

  @Column('decimal', {
    name: 'total_linea',
    default: 0,
  })
  totalLinea: number;
}
