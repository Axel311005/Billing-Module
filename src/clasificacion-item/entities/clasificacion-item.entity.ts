import { Item } from "src/item/entities/item.entity";
import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from "typeorm";

@Entity()
export class ClasificacionItem {
    
    @PrimaryGeneratedColumn()
    idClasificacion: number;

    @Column()
    descripcion: string;

    @Column({ default: true })
    activo: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fechaCreacion: Date;

    @OneToMany(() => Item, item => item.clasificacion)
    items: Item[];
}
