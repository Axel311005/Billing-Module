import { Test, TestingModule } from '@nestjs/testing';
import { ExistenciaBodegaController } from './existencia-bodega.controller';
import { ExistenciaBodegaService } from './existencia-bodega.service';

describe('ExistenciaBodegaController', () => {
  let controller: ExistenciaBodegaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExistenciaBodegaController],
      providers: [ExistenciaBodegaService],
    }).compile();

    controller = module.get<ExistenciaBodegaController>(ExistenciaBodegaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
