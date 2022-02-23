import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './dto/task.entity';
import { updateTaskStatusDto } from './dto/update-stask-status.dto';
import { TasksService } from './tasks.service';
import { Logger } from '@nestjs/common'
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('taskController', {timestamp: true});

  constructor(private tasksService: TasksService) { }

  @Get()
  getTask(
    @Query() filterDto: GetTaskFilterDto,
    @GetUser() user: User): Promise<Task[]> {
    this.logger.verbose(`User  "${user.username}", retrieving all task. Filters: ${JSON.stringify(filterDto)}`);
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get('/:id')
  getTaskById(
    @Param('id') id: string,
    @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }


  @Delete('/:id')
  deleteTaskById(
    @Param('id') id: string,
    @GetUser() user: User
  ): Promise<boolean> {
    return this.tasksService.deleteTaskById(id, user);

  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(`User "${user.username}", create new task data: ${JSON.stringify(createTaskDto)}`);
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: updateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    this.logger.verbose(`User  "${user.username}", update status task "${id}"`);
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}
