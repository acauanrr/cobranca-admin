    // apps/api-gateway/src/debito/debito.module.ts
    import { Module } from '@nestjs/common';
    import { TypeOrmModule } from '@nestjs/typeorm';
    import { DebitoService } from './debito.service';
    import { DebitoController } from './debito.controller';
    import { Debito, Inscrito, ProcessoAdministrativo } from '@cobranca/core-domain';
    import { SitacModule } from '../sitac/sitac.module';

    @Module({
      imports: [
        TypeOrmModule.forFeature([Inscrito, Debito, ProcessoAdministrativo]),
        SitacModule, // Importa para ter acesso ao SitacService
      ],
      controllers: [DebitoController],
      providers: [DebitoService],
    })
    export class DebitoModule {}
    