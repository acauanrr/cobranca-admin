// packages/core-domain/src/debito.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { Inscrito } from './inscrito.entity';
import { ProcessoAdministrativo } from './processo.entity';

@Entity('debitos')
export class Debito {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  origemId!: string; // ID original do débito no sistema SITAC

  @Column()
  descricao!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  valor!: number;

  @Column('date')
  dataVencimento!: Date;

  @ManyToOne(() => Inscrito, (inscrito) => inscrito.debitos)
  inscrito!: Inscrito;

  @OneToOne(() => ProcessoAdministrativo, (processo) => processo.debito)
  processoAdministrativo!: ProcessoAdministrativo;
}
