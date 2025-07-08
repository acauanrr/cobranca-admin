// apps/api-gateway/src/sitac/sitac.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';

// Definindo uma interface para o tipo de dado que esperamos do SITAC.
// No futuro, isso pode ir para um pacote compartilhado em `packages/`.
export interface Debito {
  id: string;
  descricao: string;
  valor: number;
  dataVencimento: string;
}

@Injectable()
export class SitacService {
  // Criamos um banco de dados falso (mock) para a nossa Prova de Conceito.
  // A chave é o CPF do devedor.
  private readonly mockDatabase: Record<string, Debito[]> = {
    '11122233344': [
      {
        id: 'anu-2023',
        descricao: 'Anuidade 2023',
        valor: 550.75,
        dataVencimento: '2023-03-31',
      },
      {
        id: 'anu-2024',
        descricao: 'Anuidade 2024',
        valor: 580.0,
        dataVencimento: '2024-03-31',
      },
    ],
    '55566677788': [
      {
        id: 'multa-01',
        descricao: 'Multa por falta de ART',
        valor: 1250.0,
        dataVencimento: '2024-05-20',
      },
    ],
  };

  /**
   * Busca os débitos de um profissional pelo CPF.
   * No futuro, este método fará uma chamada HTTP para a API real do SITAC.
   * Por enquanto, ele apenas busca os dados no nosso banco de dados mock.
   * @param cpf O CPF do profissional a ser consultado.
   */
  async getDebitosByCpf(cpf: string): Promise<Debito[]> {
    console.log(`Buscando débitos para o CPF: ${cpf}`);

    // Simula uma pequena demora, como se fosse uma chamada de rede.
    await new Promise((resolve) => setTimeout(resolve, 300));

    const debitos = this.mockDatabase[cpf];

    if (!debitos) {
      // Se não encontrarmos débitos para o CPF, lançamos um erro.
      throw new NotFoundException(`Nenhum débito encontrado para o CPF ${cpf}.`);
    }

    return debitos;
  }
}
