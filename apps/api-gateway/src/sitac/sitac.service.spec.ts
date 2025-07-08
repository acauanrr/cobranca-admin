import { Test, TestingModule } from '@nestjs/testing';
import { SitacService } from './sitac.service';

describe('SitacService', () => {
  let service: SitacService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SitacService],
    }).compile();

    service = module.get<SitacService>(SitacService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
