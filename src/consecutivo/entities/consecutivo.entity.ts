import { Compra } from "src/compra/entities/compra.entity";
import { Factura } from "src/factura/entities/factura.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('consecutivo')
export class Consecutivo {

    @PrimaryGeneratedColumn()
    idConsecutivo: number;

    @Column({ type: 'varchar', length: 100 })
    descripcion: string;

    @Column({ default: true })
    activo: boolean;

    @Column({ type: 'int' })
    longitud: number; 

    @Column({ type: 'varchar', length: 20 })
    documento: string; 

    @Column({ type: 'varchar', length: 20, nullable: true })
    mascara: string; 

    @Column({ type: 'int' })
    valorInicial: number;

    @Column({ type: 'int' })
    valorFinal: number;

    @Column({ type: 'int' })
    ultimoValor: number;

    @CreateDateColumn({ type: 'timestamp' })
    fechaCreacion: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    fechaUlt: Date;


    @OneToMany(() => Factura, (factura) => factura.consecutivo)
    facturas: Factura[];

    @OneToMany(() => Compra, (compra) => compra.consecutivo)
    compras: Compra[];
}
