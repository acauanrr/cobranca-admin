// packages/core-domain/src/entities/ProcessoAdministrativo.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'; // remova se não usar TypeORM
import { Debito } from './Debito';

export enum StatusProcesso {
  PENDENTE_ANALISE = 'PENDENTE_ANALISE',
  PRESCRITO        = 'PRESCRITO',
  EM_ANDAMENTO     = 'EM_ANDAMENTO',
  CONCLUIDO        = 'CONCLUIDO',
  CANCELADO        = 'CANCELADO',
}

export interface ProcessoProps {
  id?: string;
  debito: Debito;
  criadoEm?: Date;
  status?: StatusProcesso;
  observacoes?: string;      //  ← usado no create() do service
}

@Entity()
export class ProcessoAdministrativo {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToOne(() => Debito, { eager: true })
  debito!: Debito;

  @Column({ type: 'timestamptz' })
  criadoEm!: Date;

  @Column({ type: 'varchar' })
  status!: StatusProcesso;

  @Column({ type: 'text', nullable: true })
  observacoes?: string;

  constructor(props: ProcessoProps) {
    Object.assign(this, {
      ...props,
      criadoEm: props.criadoEm ?? new Date(),
      status:   props.status   ?? StatusProcesso.PENDENTE_ANALISE,
    });
  }

  marcarPrescrito() { this.status = StatusProcesso.PRESCRITO; }
  concluir()        { this.status = StatusProcesso.CONCLUIDO; }
  cancelar()        { this.status = StatusProcesso.CANCELADO; }
}
