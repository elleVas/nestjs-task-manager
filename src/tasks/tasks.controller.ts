import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './dto/task.entity';
import { updateTaskStatusDto } from './dto/update-stask-status.dto';
import { TaskStatus } from './task-status.enum';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Get()
  getTask(@Query() filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }

 /*@Get()
  getAllTask(): Promise<Task[]> {
    return this.tasksService.getAllTask();
  }*/

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }


  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Promise<boolean> {
    return this.tasksService.deleteTaskById(id);

  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    // console.log('body', title, description);
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: updateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }
}
