import { Test, TestingModule } from '@nestjs/testing';
import { TipoPagoController } from './tipo-pago.controller';
import { TipoPagoService } from './tipo-pago.service';

describe('TipoPagoController', () => {
  let controller: TipoPagoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoPagoController],
      providers: [TipoPagoService],
    }).compile();

    controller = module.get<TipoPagoController>(TipoPagoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
