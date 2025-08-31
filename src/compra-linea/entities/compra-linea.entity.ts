import { Compra } from "src/compra/entities/compra.entity";
import { Item } from "src/item/entities/item.entity";
import { PrimaryGeneratedColumn, ManyToOne, Column, Entity } from "typeorm";

@Entity()
export class CompraLinea {
    @PrimaryGeneratedColumn()
    idCompraLinea: number;

    @ManyToOne(() => Compra, compra => compra.lineas)
    compra: Compra;

    @ManyToOne(() => Item, item => item.compraLineas)
    item: Item;

    @Column('decimal')
    cantidad: number;

    @Column('decimal')
    precioUnitario: number;

    @Column('decimal')
    totalLinea: number;
}
