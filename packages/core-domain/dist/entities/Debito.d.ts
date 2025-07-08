import { Inscrito } from './Inscrito';
export declare enum SituacaoDebito {
    ABERTO = "ABERTO",
    PAGO = "PAGO",
    PRESCRITO = "PRESCRITO"
}
export interface DebitoProps {
    id?: string;
    origemId: string;
    inscrito?: Inscrito;
    descricao: string;
    dataVencimento: Date;
    valor: number;
    situacao: SituacaoDebito;
}
export declare class Debito {
    id?: string;
    origemId: string;
    inscrito: Inscrito;
    descricao: string;
    dataVencimento: Date;
    valor: number;
    situacao: SituacaoDebito;
    constructor(props: DebitoProps);
    estaPrescrito(hoje?: Date): boolean;
}
