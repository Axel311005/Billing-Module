import { Factura } from "src/factura/entities/factura.entity";
import { Item } from "src/item/entities/item.entity";
import { PrimaryGeneratedColumn, ManyToOne, Column, Entity } from "typeorm";

@Entity()
export class FacturaLinea {

    @PrimaryGeneratedColumn()
    idFacturaLinea: number;

    @ManyToOne(() => Factura, factura => factura.lineas)
    factura: Factura;

    @ManyToOne(() => Item, item => item.facturaLineas)
    item: Item;

    @Column('decimal')
    cantidad: number;

    @Column('decimal')
    precioUnitario: number;

    @Column('decimal')
    totalLinea: number;
}
