import { Item } from "src/item/entities/item.entity";
import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from "typeorm";

@Entity()
export class UnidadMedida {
    @PrimaryGeneratedColumn()
    idUnidadMedida: number;

    @Column()
    descripcion: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fechaCreacion: Date;

    @Column({ default: true })
    activo: boolean;

    @OneToMany(() => Item, item => item.unidadMedida)
    items: Item[];
}
