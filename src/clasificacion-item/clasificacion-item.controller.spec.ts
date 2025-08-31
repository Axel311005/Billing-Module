import { Test, TestingModule } from '@nestjs/testing';
import { ClasificacionItemController } from './clasificacion-item.controller';
import { ClasificacionItemService } from './clasificacion-item.service';

describe('ClasificacionItemController', () => {
  let controller: ClasificacionItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClasificacionItemController],
      providers: [ClasificacionItemService],
    }).compile();

    controller = module.get<ClasificacionItemController>(ClasificacionItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
