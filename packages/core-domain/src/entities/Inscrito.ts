// packages/core-domain/src/entities/Inscrito.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'; // <- remova se não usar TypeORM

export interface InscritoProps {
  id?: string;     // PK gerada pelo banco
  cpf: string;     // usado em findOneBy({ cpf })
  nome: string;
  email?: string;
  ativo?: boolean; // agora opcional
}

@Entity() // <- remova se não usar TypeORM
export class Inscrito {
  /* ---------- Colunas ---------- */
  @PrimaryGeneratedColumn('uuid')        // <- remova se não usar TypeORM
  id?: string;

  @Column({ length: 14, unique: true }) // <- remova se não usar TypeORM
  cpf!: string;

  @Column()                             // <- remova se não usar TypeORM
  nome!: string;

  @Column({ nullable: true })           // <- remova se não usar TypeORM
  email?: string;

  @Column({ default: true })            // <- remova se não usar TypeORM
  ativo!: boolean;

  /* ---------- Domínio ---------- */
  constructor(props: InscritoProps) {
    // atribuição explícita evita o strictPropertyInitialization
    this.id     = props.id;
    this.cpf    = props.cpf;
    this.nome   = props.nome;
    this.email  = props.email;
    this.ativo  = props.ativo ?? true;  // default = true
  }

  ativar()  { this.ativo = true; }
  inativar(){ this.ativo = false; }

  toJSON(): InscritoProps {
    const { id, cpf, nome, email, ativo } = this;
    return { id, cpf, nome, email, ativo };
  }
}
