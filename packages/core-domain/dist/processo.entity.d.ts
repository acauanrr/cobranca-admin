import { Debito } from './debito.entity';
export declare enum StatusProcesso {
    PENDENTE_ANALISE = "PENDENTE_ANALISE",
    PRESCRITO = "PRESCRITO",
    EM_COBRANCA = "EM_COBRANCA",
    PAGO = "PAGO",
    CANCELADO = "CANCELADO"
}
export declare class ProcessoAdministrativo {
    id: string;
    status: StatusProcesso;
    dataCriacao: Date;
    observacoes?: string;
    debito: Debito;
}
