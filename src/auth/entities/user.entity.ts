import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Empleado } from 'src/empleado/entities/empleado.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column('text', {
    name: 'email',
    unique: true,
  })
  email: string;

  @Column('text', {
    name: 'password',
    select: false,
  })
  password: string;

  @Column('text', { name: 'full_name' })
  fullName: string;

  @Column('bool', {
    name: 'is_active',
    default: true,
  })
  isActive: boolean;

  @Column('text', {
    name: 'roles',
    array: true,
    default: ['user'],
  })
  roles: string[];

  @OneToOne(() => Empleado, (empleado) => empleado.user, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'empleado_id' })
  empleado?: Empleado;

  @OneToOne(() => Cliente, (cliente) => cliente.user, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'cliente_id' })
  cliente?: Cliente;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.email = this.email.toLowerCase().trim();
  }
}
