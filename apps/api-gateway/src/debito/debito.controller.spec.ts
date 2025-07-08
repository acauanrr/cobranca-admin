// apps/api-gateway/src/debito/debito.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { DebitoController } from './debito.controller';
import { DebitoService } from './debito.service';

describe('DebitoController', () => {
  let controller: DebitoController;

  /** mock mínimo com apenas o método usado pelo controller */
  const debitoServiceMock = {
    sincronizarDebitos: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DebitoController],
      providers: [
        { provide: DebitoService, useValue: debitoServiceMock },
      ],
    }).compile();

    controller = module.get<DebitoController>(DebitoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('deve disparar sincronização e responder 202', async () => {
    const cpf = '12345678900';

    const resposta = await controller.sincronizar(cpf);

    expect(debitoServiceMock.sincronizarDebitos).toHaveBeenCalledWith(cpf);
    expect(resposta).toEqual({
      message: `Sincronização para o CPF ${cpf} iniciada.`,
    });
  });
});
