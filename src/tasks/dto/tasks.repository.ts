import { NotFoundException, Logger, InternalServerErrorException } from "@nestjs/common";
import { User } from "../../auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { TaskStatus } from "../task-status.enum";
import { CreateTaskDto } from "./create-task.dto";
import { GetTaskFilterDto } from "./get-tasks-filter.dto";
import { Task } from "./task.entity";
import { TaskCategory } from "../../tasks-category/dto/tasks-category.entity";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
    private logger = new Logger('taskRepository', { timestamp: true });

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description, taskCategory } = createTaskDto;
        try {
            const task = this.create({
                title,
                description,
                status: TaskStatus.OPEN,
                user: user,
                taskCategory,
            });
            await this.save(task);
            return task;
        } catch (error) {
            this.logger.error(`Fail user: "${user.username}",
            try to create task: ${JSON.stringify(createTaskDto)}`, error.stask);
           throw new InternalServerErrorException();
        }

    }

    async deleteTask(id: string, user: User): Promise<boolean> {
        const result = await this.delete({ id, user });
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID:"${id}" not found`);
        }
        return true;

    }

    async getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
        const { status, search } = filterDto;
        //typeorm query to extract category of task
        const query = this.createQueryBuilder('task').leftJoinAndSelect("task.taskCategory", "task_category")
        //only task of user logged
        query.where({ user });

        if (status) {
            query.andWhere('task.status = :status', { status })
        }
        if (search) {
            query.andWhere('(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
                { search: `%${search}%` })
        }

        try {
            const tasks = await query.getMany();
            console.log(tasks);
            return tasks;
        } catch (error) {
            this.logger.error(`Fail get task for user: "${user.username}",
             Filters: ${JSON.stringify(filterDto)}`, error.stask);
            throw new InternalServerErrorException();
        }

    }

    async updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
        const task = await this.findOne({ where: { id: id, user: user } });
        task.status = status;
        try {
            await this.save(task);
            return task;
        } catch (error) {
            this.logger.error(`Fail user: "${user.username}",
             try update status task: ${JSON.stringify(status)}`, error.stask);
            throw new InternalServerErrorException();
        }

    }
}