// packages/core-domain/src/inscrito.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Debito } from './debito.entity';

@Entity('inscritos')
export class Inscrito {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  cpf!: string;

  @Column()
  nome!: string;

  @Column({ nullable: true })
  email?: string;

  @OneToMany(() => Debito, (debito) => debito.inscrito)
  debitos!: Debito[];
}
