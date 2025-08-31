import { Test, TestingModule } from '@nestjs/testing';
import { ExistenciaBodegaService } from './existencia-bodega.service';

describe('ExistenciaBodegaService', () => {
  let service: ExistenciaBodegaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExistenciaBodegaService],
    }).compile();

    service = module.get<ExistenciaBodegaService>(ExistenciaBodegaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
