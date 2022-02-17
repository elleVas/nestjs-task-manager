import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { updateTaskStatusDto } from './dto/update-stask-status.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Get()
  getTask(@Query() filterDto: GetTaskFilterDto): Task[] {
    //if we have filter call taskService.getFilterTask()
    //else getAllTask()
    if (Object.keys(filterDto).length) {
      //function to implement
      return this.tasksService.getTaskWithFilter(filterDto);
    } else {
      return this.tasksService.getAllTask();
    }

  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    return this.tasksService.deleteTaskById(id);

  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto):
    Task {
    // console.log('body', title, description);
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: updateTaskStatusDto,
  ): Task {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }
}
