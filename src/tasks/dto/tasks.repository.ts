import { NotFoundException } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { TaskStatus } from "../task-status.enum";
import { CreateTaskDto } from "./create-task.dto";
import { GetTaskFilterDto } from "./get-tasks-filter.dto";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto;

        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
            user: user
        });
        await this.save(task);
        return task;
    }

    async deleteTask(id: string): Promise<boolean> {
        const result = await this.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID:"${id}" not found`);
        }
        return true;

    }

    async getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');
        //only task of user logged
        query.where({ user });
        
        if (status) {
            query.andWhere('task.status = :status', { status })
        }
        if (search) {
            query.andWhere('(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
                { search: `%${search}%` })
        }
        const tasks = await query.getMany();
        return tasks;
    }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.findOne(id);
        task.status = status;
        await this.save(task);
        return task;
    }
}