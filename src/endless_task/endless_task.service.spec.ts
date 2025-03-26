import { Test, TestingModule } from '@nestjs/testing';
import { EndlessTaskService } from './endless_task.service';

describe('EndlessTaskService', () => {
  let service: EndlessTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EndlessTaskService],
    }).compile();

    service = module.get<EndlessTaskService>(EndlessTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
