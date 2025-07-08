    // apps/api-gateway/src/debito/debito.controller.ts
    import { Controller, Post, Param, HttpCode, HttpStatus } from '@nestjs/common';
    import { DebitoService } from './debito.service';

    @Controller('debitos')
    export class DebitoController {
      constructor(private readonly debitoService: DebitoService) {}

      @Post('sincronizar/:cpf')
      @HttpCode(HttpStatus.ACCEPTED)
      async sincronizar(@Param('cpf') cpf: string) {
        // Não usamos await aqui para que a resposta seja imediata.
        // A sincronização rodará em background.
        this.debitoService.sincronizarDebitos(cpf);
        return { message: `Sincronização para o CPF ${cpf} iniciada.` };
      }
    }
    