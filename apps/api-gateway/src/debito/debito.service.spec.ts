// apps/api-gateway/src/debito/debito.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DebitoService } from './debito.service';
import { SitacService } from '../sitac/sitac.service';
import { Debito, Inscrito, ProcessoAdministrativo, StatusProcesso } from '@cobranca/core-domain';

// Mock dos repositórios e serviços
const mockRepository = () => ({
  findOneBy: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

const mockSitacService = () => ({
  getDebitosByCpf: jest.fn(),
});

describe('DebitoService', () => {
  let service: DebitoService;
  let sitacService: ReturnType<typeof mockSitacService>;
  let inscritoRepo: ReturnType<typeof mockRepository>;
  let debitoRepo: ReturnType<typeof mockRepository>;
  let processoRepo: ReturnType<typeof mockRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DebitoService,
        { provide: SitacService, useFactory: mockSitacService },
        { provide: getRepositoryToken(Inscrito), useFactory: mockRepository },
        { provide: getRepositoryToken(Debito), useFactory: mockRepository },
        { provide: getRepositoryToken(ProcessoAdministrativo), useFactory: mockRepository },
      ],
    }).compile();

    service = module.get<DebitoService>(DebitoService);
    sitacService = module.get(SitacService);
    inscritoRepo = module.get(getRepositoryToken(Inscrito));
    debitoRepo = module.get(getRepositoryToken(Debito));
    processoRepo = module.get(getRepositoryToken(ProcessoAdministrativo));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should correctly identify and save a non-prescribed debit', async () => {
    const cpf = '12345678900';
    const debitoDto = { id: '1', descricao: 'Anuidade 2024', valor: 100, dataVencimento: '2024-03-31' };
    
    sitacService.getDebitosByCpf.mockResolvedValue([debitoDto]);
    inscritoRepo.findOneBy.mockResolvedValue(null); // Inscrito não existe
    debitoRepo.findOneBy.mockResolvedValue(null); // Débito não existe
    inscritoRepo.create.mockReturnValue({ cpf, nome: `Inscrito ${cpf}` });
    debitoRepo.create.mockReturnValue(debitoDto);

    await service.sincronizarDebitos(cpf);

    expect(processoRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({ status: StatusProcesso.PENDENTE_ANALISE })
    );
    expect(processoRepo.save).toHaveBeenCalled();
  });

  it('should correctly identify and save a prescribed debit', async () => {
    const cpf = '12345678900';
    // Vencimento em 2018, hoje é 2025 -> prescrito
    const debitoDto = { id: '2', descricao: 'Anuidade 2018', valor: 80, dataVencimento: '2018-03-31' };

    sitacService.getDebitosByCpf.mockResolvedValue([debitoDto]);
    inscritoRepo.findOneBy.mockResolvedValue({ id: 'uuid-inscrito', cpf });
    debitoRepo.findOneBy.mockResolvedValue(null);
    debitoRepo.create.mockReturnValue(debitoDto);
    
    await service.sincronizarDebitos(cpf);

    expect(processoRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({ status: StatusProcesso.PRESCRITO })
    );
    expect(processoRepo.save).toHaveBeenCalled();
  });

  it('should skip a debit that already exists', async () => {
    const cpf = '12345678900';
    const debitoDto = { id: '3', descricao: 'Anuidade 2023', valor: 90, dataVencimento: '2023-03-31' };

    sitacService.getDebitosByCpf.mockResolvedValue([debitoDto]);
    inscritoRepo.findOneBy.mockResolvedValue({ id: 'uuid-inscrito', cpf });
    debitoRepo.findOneBy.mockResolvedValue(debitoDto); // Débito JÁ EXISTE

    await service.sincronizarDebitos(cpf);
    
    // Se o débito já existe, não devemos tentar criar um novo
    expect(debitoRepo.create).not.toHaveBeenCalled();
    expect(processoRepo.create).not.toHaveBeenCalled();
  });
});