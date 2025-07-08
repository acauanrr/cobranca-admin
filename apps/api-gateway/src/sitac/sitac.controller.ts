// apps/api-gateway/src/sitac/sitac.controller.ts
import { Controller, Get, Param, ParseFilePipeBuilder } from '@nestjs/common';
import { SitacService, Debito } from './sitac.service';

@Controller('sitac') // Define o prefixo da rota para este controlador: /sitac
export class SitacController {
  // O NestJS injeta a instância do SitacService aqui (Injeção de Dependência).
  constructor(private readonly sitacService: SitacService) {}

  /**
   * Define um endpoint GET em /sitac/debitos/:cpf
   * Exemplo de como chamar: http://localhost:3000/sitac/debitos/11122233344
   * @param cpf O CPF vindo da URL.
   */
  @Get('debitos/:cpf')
  async findDebitos(@Param('cpf') cpf: string): Promise<Debito[]> {
    return this.sitacService.getDebitosByCpf(cpf);
  }
}
