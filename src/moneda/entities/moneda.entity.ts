import { Compra } from "src/compra/entities/compra.entity";
import { Factura } from "src/factura/entities/factura.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Moneda {

    @PrimaryGeneratedColumn()
    idMoneda: number;

    @Column()
    descripcion: string;

    @Column('decimal')
    tipoCambio: number;

    @Column({ default: true })
    activo: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fechaCreacion: Date;

    @OneToMany(() => Factura, factura => factura.moneda)
    facturas: Factura;

    @OneToMany(() => Compra, compra => compra.moneda)
    compras: Compra;
}
