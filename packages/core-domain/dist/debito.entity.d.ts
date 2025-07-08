import { Inscrito } from './inscrito.entity';
import { ProcessoAdministrativo } from './processo.entity';
export declare class Debito {
    id: string;
    origemId: string;
    descricao: string;
    valor: number;
    dataVencimento: Date;
    inscrito: Inscrito;
    processoAdministrativo: ProcessoAdministrativo;
}
