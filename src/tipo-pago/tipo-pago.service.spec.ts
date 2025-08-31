import { Test, TestingModule } from '@nestjs/testing';
import { TipoPagoService } from './tipo-pago.service';

describe('TipoPagoService', () => {
  let service: TipoPagoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoPagoService],
    }).compile();

    service = module.get<TipoPagoService>(TipoPagoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
