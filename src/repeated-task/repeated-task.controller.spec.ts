import { Test, TestingModule } from '@nestjs/testing';
import { RepeatedTaskController } from './repeated-task.controller';

describe('RepeatedTaskController', () => {
  let controller: RepeatedTaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepeatedTaskController],
    }).compile();

    controller = module.get<RepeatedTaskController>(RepeatedTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
