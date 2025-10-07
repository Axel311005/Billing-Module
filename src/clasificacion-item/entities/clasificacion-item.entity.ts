import { Item } from 'src/item/entities/item.entity';
import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from 'typeorm';

@Entity()
export class ClasificacionItem {
  @PrimaryGeneratedColumn({ name: 'id_clasificacion' })
  idClasificacion: number;

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

  @OneToMany(() => Item, (item) => item.clasificacion)
  items: Item[];
}
