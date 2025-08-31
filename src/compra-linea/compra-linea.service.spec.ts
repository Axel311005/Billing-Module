import { Test, TestingModule } from '@nestjs/testing';
import { CompraLineaService } from './compra-linea.service';

describe('CompraLineaService', () => {
  let service: CompraLineaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompraLineaService],
    }).compile();

    service = module.get<CompraLineaService>(CompraLineaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
