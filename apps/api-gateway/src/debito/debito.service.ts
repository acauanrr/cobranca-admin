    // apps/api-gateway/src/debito/debito.service.ts
    import { Injectable, Logger } from '@nestjs/common';
    import { InjectRepository } from '@nestjs/typeorm';
    import { Repository } from 'typeorm';
    import { Debito, Inscrito, ProcessoAdministrativo, StatusProcesso } from '@cobranca/core-domain';
    import { SitacService } from '../sitac/sitac.service';

    @Injectable()
    export class DebitoService {
      private readonly logger = new Logger(DebitoService.name);

      constructor(
        @InjectRepository(Inscrito)
        private readonly inscritoRepository: Repository<Inscrito>,
        @InjectRepository(Debito)
        private readonly debitoRepository: Repository<Debito>,
        @InjectRepository(ProcessoAdministrativo)
        private readonly processoRepository: Repository<ProcessoAdministrativo>,
        private readonly sitacService: SitacService,
      ) {}

      /**
       * Verifica se um débito está prescrito (mais de 5 anos do vencimento).
       */
      private isPrescrito(dataVencimento: Date): boolean {
        const hoje = new Date();
        const dataPrescricao = new Date(dataVencimento);
        dataPrescricao.setFullYear(dataPrescricao.getFullYear() + 5);
        return hoje > dataPrescricao;
      }

      /**
       * Orquestra a sincronização de débitos para um determinado CPF.
       */
      async sincronizarDebitos(cpf: string): Promise<void> {
        this.logger.log(`Iniciando sincronização para o CPF: ${cpf}`);

        // 1. Busca os débitos no sistema de origem (SITAC mock)
        const debitosSitac = await this.sitacService.getDebitosByCpf(cpf);
        if (!debitosSitac || debitosSitac.length === 0) {
          this.logger.warn(`Nenhum débito encontrado no SITAC para o CPF ${cpf}`);
          return;
        }

        // 2. Garante que o inscrito exista no nosso banco
        let inscrito = await this.inscritoRepository.findOneBy({ cpf });
        if (!inscrito) {
          this.logger.log(`Inscrito com CPF ${cpf} não encontrado. Criando...`);
          inscrito = this.inscritoRepository.create({ cpf, nome: `Inscrito ${cpf}` }); // Nome mockado
          await this.inscritoRepository.save(inscrito);
        }

        // 3. Processa cada débito retornado
        for (const debitoDto of debitosSitac) {
          const debitoExistente = await this.debitoRepository.findOneBy({ origemId: debitoDto.id, inscrito: { id: inscrito.id } });

          if (debitoExistente) {
            this.logger.log(`Débito ${debitoDto.id} já existe. Pulando.`);
            continue;
          }

          this.logger.log(`Processando novo débito: ${debitoDto.descricao}`);

          // 4. Cria e salva a entidade Debito
          const novoDebito = this.debitoRepository.create({
            ...debitoDto,
            origemId: debitoDto.id,
            dataVencimento: new Date(debitoDto.dataVencimento),
            inscrito,
          });
          await this.debitoRepository.save(novoDebito);

          // 5. Verifica a prescrição e cria o processo administrativo
          const prescrito = this.isPrescrito(novoDebito.dataVencimento);
          const status = prescrito ? StatusProcesso.PRESCRITO : StatusProcesso.PENDENTE_ANALISE;
          const observacoes = prescrito ? 'Débito identificado como prescrito na sincronização inicial.' : null;
          
          this.logger.log(`Status do débito ${novoDebito.descricao}: ${status}`);

          const novoProcesso = this.processoRepository.create({
            debito: novoDebito,
            status,
            observacoes,
          });
          await this.processoRepository.save(novoProcesso);
        }
        this.logger.log(`Sincronização para o CPF ${cpf} finalizada.`);
      }
    }
    