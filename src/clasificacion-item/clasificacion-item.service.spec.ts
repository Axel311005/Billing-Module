import { Test, TestingModule } from '@nestjs/testing';
import { ClasificacionItemService } from './clasificacion-item.service';

describe('ClasificacionItemService', () => {
  let service: ClasificacionItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClasificacionItemService],
    }).compile();

    service = module.get<ClasificacionItemService>(ClasificacionItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
