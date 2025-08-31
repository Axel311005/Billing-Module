import { Test, TestingModule } from '@nestjs/testing';
import { FacturaLineaService } from './factura-linea.service';

describe('FacturaLineaService', () => {
  let service: FacturaLineaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacturaLineaService],
    }).compile();

    service = module.get<FacturaLineaService>(FacturaLineaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
