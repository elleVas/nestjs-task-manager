import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateTaskCategoryDto } from './dto/create-task-category.dto';
import { GetTaskCategoryFilterDto } from './dto/get-tasks-category-filter.dto';
import { TaskCategory } from './dto/tasks-category.entity';
import { updateTaskCategoryStatusDto } from './dto/update-task-category-status.dto';
import { TasksCategoryService } from './tasks-category.service';
import { Logger } from '@nestjs/common';

@Controller('tasks-category')
@UseGuards(AuthGuard())
export class TasksCategoryController {

  private logger = new Logger('taskCategoryController', {timestamp: true});

  constructor(private TasksCategoryService: TasksCategoryService) { }

  @Get()
  getTask(
    @Query() filterDto: GetTaskCategoryFilterDto,
    @GetUser() user: User): Promise<TaskCategory[]> {
    this.logger.verbose(`User  "${user.username}", retrieving all task category. Filters: ${JSON.stringify(filterDto)}`);
    return this.TasksCategoryService.getTasks(filterDto, user);
  }

  @Get('/:id')
  getTaskById(
    @Param('id') id: string,
    @GetUser() user: User): Promise<TaskCategory> {
    return this.TasksCategoryService.getTaskById(id, user);
  }


  @Delete('/:id')
  deleteTaskById(
    @Param('id') id: string,
    @GetUser() user: User
  ): Promise<boolean> {
    return this.TasksCategoryService.deleteTaskById(id, user);

  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskCategoryDto,
    @GetUser() user: User,
  ): Promise<TaskCategory> {
    this.logger.verbose(`User "${user.username}", create new task data: ${JSON.stringify(createTaskDto)}`);
    return this.TasksCategoryService.createTask(createTaskDto, user);
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: updateTaskCategoryStatusDto,
    @GetUser() user: User,
  ): Promise<TaskCategory> {
    const { status } = updateTaskStatusDto;
    this.logger.verbose(`User  "${user.username}", update status task "${id}"`);
    return this.TasksCategoryService.updateTaskStatus(id, status, user);
  }
}
