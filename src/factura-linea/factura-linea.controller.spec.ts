import { Test, TestingModule } from '@nestjs/testing';
import { FacturaLineaController } from './factura-linea.controller';
import { FacturaLineaService } from './factura-linea.service';

describe('FacturaLineaController', () => {
  let controller: FacturaLineaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacturaLineaController],
      providers: [FacturaLineaService],
    }).compile();

    controller = module.get<FacturaLineaController>(FacturaLineaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
