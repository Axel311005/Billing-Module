import { Test, TestingModule } from '@nestjs/testing';
import { UnidadMedidaController } from './unidad-medida.controller';
import { UnidadMedidaService } from './unidad-medida.service';

describe('UnidadMedidaController', () => {
  let controller: UnidadMedidaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnidadMedidaController],
      providers: [UnidadMedidaService],
    }).compile();

    controller = module.get<UnidadMedidaController>(UnidadMedidaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
