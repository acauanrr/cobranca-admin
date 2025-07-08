import { Debito } from './debito.entity';
export declare class Inscrito {
    id: string;
    cpf: string;
    nome: string;
    email?: string;
    debitos: Debito[];
}
