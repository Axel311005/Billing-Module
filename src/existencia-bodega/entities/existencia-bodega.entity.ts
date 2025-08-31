import { Bodega } from "src/bodega/entities/bodega.entity";
import { Item } from "src/item/entities/item.entity";
import { PrimaryGeneratedColumn, ManyToOne, Column, Entity } from "typeorm";

@Entity()
export class ExistenciaBodega {
    @PrimaryGeneratedColumn()
    idExistenciaBodega: number;

    @ManyToOne(() => Item, item => item.existencias)
    item: Item;

    @ManyToOne(() => Bodega, bodega => bodega.existencias)
    bodega: Bodega;

    @Column('decimal')
    cantDisponible: number;

    @Column('decimal')
    existenciaMaxima: number;

    @Column('decimal')
    existenciaMinima: number;

    @Column('decimal')
    puntoDeReorden: number;
}
