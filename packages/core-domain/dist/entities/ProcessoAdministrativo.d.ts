import { Debito } from './Debito';
export declare enum StatusProcesso {
    PENDENTE_ANALISE = "PENDENTE_ANALISE",
    PRESCRITO = "PRESCRITO",
    EM_ANDAMENTO = "EM_ANDAMENTO",
    CONCLUIDO = "CONCLUIDO",
    CANCELADO = "CANCELADO"
}
export interface ProcessoProps {
    id?: string;
    debito: Debito;
    criadoEm?: Date;
    status?: StatusProcesso;
    observacoes?: string;
}
export declare class ProcessoAdministrativo {
    id?: string;
    debito: Debito;
    criadoEm: Date;
    status: StatusProcesso;
    observacoes?: string;
    constructor(props: ProcessoProps);
    marcarPrescrito(): void;
    concluir(): void;
    cancelar(): void;
}
