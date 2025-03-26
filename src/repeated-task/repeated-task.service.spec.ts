import { Test, TestingModule } from '@nestjs/testing';
import { RepeatedTaskService } from './repeated-task.service';

describe('RepeatedTaskService', () => {
  let service: RepeatedTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepeatedTaskService],
    }).compile();

    service = module.get<RepeatedTaskService>(RepeatedTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
