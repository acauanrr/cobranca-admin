// apps/api-gateway/src/sitac/sitac.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { SitacController } from './sitac.controller';
import { SitacService } from './sitac.service';

describe('SitacController', () => {
  let controller: SitacController;
  let service: SitacService;

  // Mock do serviço para não usar o serviço real nos testes do controlador
  const mockSitacService = {
    getDebitosByCpf: jest.fn().mockResolvedValue([
      { id: 'mock-debito', descricao: 'Mock Debito', valor: 100, dataVencimento: '2025-01-01' }
    ]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SitacController],
      // A correção está aqui: Adicionamos a seção 'providers'
      providers: [
        {
          provide: SitacService,
          useValue: mockSitacService, // Usamos um valor mockado
        },
      ],
    }).compile();

    controller = module.get<SitacController>(SitacController);
    service = module.get<SitacService>(SitacService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call getDebitosByCpf with the correct cpf', async () => {
    const cpf = '11122233344';
    await controller.findDebitos(cpf);
    // Verificamos se o método do serviço foi chamado com o parâmetro correto
    expect(service.getDebitosByCpf).toHaveBeenCalledWith(cpf);
  });
});
