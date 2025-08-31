import { ExistenciaBodega } from "src/existencia-bodega/entities/existencia-bodega.entity";
import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from "typeorm";

@Entity()
export class Bodega {

    @PrimaryGeneratedColumn()
    idBodega: number;

    @Column()
    descripcion: string;

    @Column({ default: true })
    activo: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fechaCreacion: Date;

    @OneToMany(() => ExistenciaBodega, existencia => existencia.bodega)
    existencias: ExistenciaBodega[];
}
