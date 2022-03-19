import { Test, TestingModule } from '@nestjs/testing';
import { TasksCategoryService } from './tasks-category.service';

describe('TasksCategoryService', () => {
  let service: TasksCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksCategoryService],
    }).compile();

    service = module.get<TasksCategoryService>(TasksCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
