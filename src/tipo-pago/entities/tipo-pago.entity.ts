import { Compra } from "src/compra/entities/compra.entity";
import { Factura } from "src/factura/entities/factura.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TipoPago {

    @PrimaryGeneratedColumn()
    idTipoPago: number;

    @Column()
    descripcion: string;

    @Column({ default: true })
    activo: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fechaCreacion: Date;

    @OneToMany(() => Factura, factura => factura.tipoPago)
    facturas: Factura[];

    @OneToMany(() => Compra, compra => compra.tipoPago)
    compras: Compra[];
}
