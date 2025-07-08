export interface InscritoProps {
    id?: string;
    cpf: string;
    nome: string;
    email?: string;
    ativo?: boolean;
}
export declare class Inscrito {
    id?: string;
    cpf: string;
    nome: string;
    email?: string;
    ativo: boolean;
    constructor(props: InscritoProps);
    ativar(): void;
    inativar(): void;
    toJSON(): InscritoProps;
}
