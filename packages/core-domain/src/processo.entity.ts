// packages/core-domain/src/processo.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Debito } from './debito.entity';

export enum StatusProcesso {
  PENDENTE_ANALISE = 'PENDENTE_ANALISE',
  PRESCRITO = 'PRESCRITO',
  EM_COBRANCA = 'EM_COBRANCA',
  PAGO = 'PAGO',
  CANCELADO = 'CANCELADO',
}

@Entity('processos_administrativos')
export class ProcessoAdministrativo {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'enum',
    enum: StatusProcesso,
    default: StatusProcesso.PENDENTE_ANALISE,
  })
  status!: StatusProcesso;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  dataCriacao!: Date;

  @Column('text', { nullable: true })
  observacoes?: string;

  @OneToOne(() => Debito, (debito) => debito.processoAdministrativo)
  @JoinColumn()
  debito!: Debito;
}
