import { Bodega } from 'src/bodega/entities/bodega.entity';
import { Item } from 'src/item/entities/item.entity';
import {
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Entity,
  JoinColumn,
} from 'typeorm';

@Entity()
export class ExistenciaBodega {
  @PrimaryGeneratedColumn({ name: 'id_existencia_bodega' })
  idExistenciaBodega: number;

  @ManyToOne(() => Item, (item) => item.existencias)
  @JoinColumn({ name: 'id_item' })
  item: Item;

  @ManyToOne(() => Bodega, (bodega) => bodega.existencias)
  @JoinColumn({ name: 'id_bodega' })
  bodega: Bodega;

  @Column('decimal', { name: 'cant_disponible' })
  cantDisponible: number;

  @Column('decimal', { name: 'existencia_maxima' })
  existenciaMaxima: number;

  @Column('decimal', { name: 'existencia_minima' })
  existenciaMinima: number;

  @Column('decimal', { name: 'punto_de_reorden' })
  puntoDeReorden: number;
}
