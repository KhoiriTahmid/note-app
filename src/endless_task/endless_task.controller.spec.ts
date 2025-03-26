import { Test, TestingModule } from '@nestjs/testing';
import { EndlessTaskController } from './endless_task.controller';

describe('EndlessTaskController', () => {
  let controller: EndlessTaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EndlessTaskController],
    }).compile();

    controller = module.get<EndlessTaskController>(EndlessTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
