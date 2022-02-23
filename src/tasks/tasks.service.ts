import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './dto/tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './dto/task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TasksRepository)
    private taskRepository: TasksRepository,
  ) { }


  getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }


  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id: id, user: user } });
    if (!found) {
      throw new NotFoundException(`Task with ID:"${id}" not found`);
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  deleteTaskById(id: string, user: User): Promise<boolean> {
    return this.taskRepository.deleteTask(id, user);
  }

  updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
    return this.taskRepository.updateTaskStatus(id, status, user);
  }

}
