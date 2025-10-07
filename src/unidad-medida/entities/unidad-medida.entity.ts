import { Item } from 'src/item/entities/item.entity';
import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from 'typeorm';

@Entity()
export class UnidadMedida {
  @PrimaryGeneratedColumn({ name: 'id_unidad_medida' })
  idUnidadMedida: number;

  @Column({ name: 'descripcion' })
  descripcion: string;

  @Column({
    name: 'fecha_creacion',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaCreacion: Date;

  @Column({ name: 'activo', default: true })
  activo: boolean;

  @OneToMany(() => Item, (item) => item.unidadMedida)
  items: Item[];
}
