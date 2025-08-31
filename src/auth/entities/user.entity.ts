import { PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, BeforeUpdate, Entity } from "typeorm";

@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id:string;

    @Column('text', {
        unique: true
    })
    email: string;

    @Column('text', {
        select : false
    })
    password: string;

    @Column('text')
    fullName: string;

    @Column('text')
    userName: string;

    @Column('bool',{
        default : true
    })
    activo: boolean;


    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.email = this.email.toLowerCase().trim();
    }
}
