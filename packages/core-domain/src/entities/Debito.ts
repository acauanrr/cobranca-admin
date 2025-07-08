// packages/core-domain/src/entities/Debito.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'; // remova se não usar TypeORM
import { Inscrito } from './Inscrito';

export enum SituacaoDebito {
  ABERTO    = 'ABERTO',
  PAGO      = 'PAGO',
  PRESCRITO = 'PRESCRITO',
}

export interface DebitoProps {
  id?: string;
  origemId: string;           // ID vindo do SITAC
  inscrito?: Inscrito;        // relação objeto (opcional para criar)
  descricao: string;
  dataVencimento: Date;
  valor: number;
  situacao: SituacaoDebito;
}

@Entity()   // remova se não usar TypeORM
export class Debito {
  /* ---------- Colunas ---------- */
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ unique: true })
  origemId!: string;

  @ManyToOne(() => Inscrito, { eager: true })
  inscrito!: Inscrito;

  @Column()
  descricao!: string;

  @Column({ type: 'date' })
  dataVencimento!: Date;

  @Column('decimal', { precision: 12, scale: 2 })
  valor!: number;

  @Column({ type: 'varchar' })
  situacao!: SituacaoDebito;

  /* ---------- Domínio ---------- */
  constructor(props: DebitoProps) {
    Object.assign(this, {
      ...props,
      // defaults
      situacao: props.situacao ?? SituacaoDebito.ABERTO,
    });
  }

  estaPrescrito(hoje: Date = new Date()): boolean {
    const limite = new Date(this.dataVencimento);
    limite.setFullYear(limite.getFullYear() + 5);
    return hoje > limite;
  }
}
