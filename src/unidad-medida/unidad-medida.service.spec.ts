import { Test, TestingModule } from '@nestjs/testing';
import { UnidadMedidaService } from './unidad-medida.service';

describe('UnidadMedidaService', () => {
  let service: UnidadMedidaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnidadMedidaService],
    }).compile();

    service = module.get<UnidadMedidaService>(UnidadMedidaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
