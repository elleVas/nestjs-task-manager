import { Test, TestingModule } from '@nestjs/testing';
import { TasksCategoryController } from './tasks-category.controller';

describe('TasksCategoryController', () => {
  let controller: TasksCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksCategoryController],
    }).compile();

    controller = module.get<TasksCategoryController>(TasksCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
