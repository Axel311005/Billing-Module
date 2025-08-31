import { Test, TestingModule } from '@nestjs/testing';
import { CompraLineaController } from './compra-linea.controller';
import { CompraLineaService } from './compra-linea.service';

describe('CompraLineaController', () => {
  let controller: CompraLineaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompraLineaController],
      providers: [CompraLineaService],
    }).compile();

    controller = module.get<CompraLineaController>(CompraLineaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
