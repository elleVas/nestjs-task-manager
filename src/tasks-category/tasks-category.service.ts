import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskCategoryStatus } from './tasks-category-status.enum';
import { CreateTaskCategoryDto } from './dto/create-task-category.dto';
import { GetTaskCategoryFilterDto } from './dto/get-tasks-category-filter.dto';
import { TasksCategoryRepository } from './dto/tasks-category.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskCategory } from './dto/tasks-category.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksCategoryService {

  constructor(
    @InjectRepository(TasksCategoryRepository)
    private tasksCategoryRepository: TasksCategoryRepository,
  ) { }


  getTasks(filterDto: GetTaskCategoryFilterDto, user: User): Promise<TaskCategory[]> {
    return this.tasksCategoryRepository.getCategoryTasks(filterDto, user);
  }


  async getTaskById(id: string, user: User): Promise<TaskCategory> {
    const found = await this.tasksCategoryRepository.findOne({ where: { id: id, user: user } });
    if (!found) {
      throw new NotFoundException(`Task category with ID:"${id}" not found`);
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskCategoryDto, user: User): Promise<TaskCategory> {
    return this.tasksCategoryRepository.createCategoryTasks(createTaskDto, user);
  }

  deleteTaskById(id: string, user: User): Promise<boolean> {
    return this.tasksCategoryRepository.deleteCategoryTask(id, user);
  }

  updateTaskStatus(id: string, status: TaskCategoryStatus, user: User): Promise<TaskCategory> {
    return this.tasksCategoryRepository.updateTaskCategoryStatus(id, status, user);
  }

}

