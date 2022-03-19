import { NotFoundException, Logger, InternalServerErrorException } from "@nestjs/common";
import { timeStamp } from "console";
import { User } from "../../auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { TaskCategoryStatus } from "../tasks-category-status.enum";
import { CreateTaskCategoryDto } from "./create-task-category.dto";
import { GetTaskCategoryFilterDto } from "./get-tasks-category-filter.dto";
import { TaskCategory } from "./tasks-category.entity";


@EntityRepository(TaskCategory)
export class TasksCategoryRepository extends Repository<TaskCategory> {
    private logger = new Logger('taskRepository', { timestamp: true });

    async createCategoryTasks(CreateTaskCategoryDto: CreateTaskCategoryDto, user: User): Promise<TaskCategory> {
        const { description } = CreateTaskCategoryDto;
        try {
            const taskCategory = this.create({
                description,
                status: TaskCategoryStatus.ACTIVE,
                user: user
            });
            await this.save(taskCategory);
            return taskCategory;
        } catch (error) {
            this.logger.error(`Fail user: "${user.username}",
            try to create task category: ${JSON.stringify(CreateTaskCategoryDto)}`, error.stask);
           throw new InternalServerErrorException();
        }

    }

    async deleteCategoryTask(id: string, user: User): Promise<boolean> {
        const result = await this.delete({ id, user });
        if (result.affected === 0) {
            throw new NotFoundException(`Task category with ID:"${id}" not found`);
        }
        return true;

    }

    async getCategoryTasks(filterDto: GetTaskCategoryFilterDto, user: User): Promise<TaskCategory[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('taskCategory');
        //only task of user logged
        query.where({ user });

        if (status) {
            query.andWhere('task.status = :status', { status })
        }
        if (search) {
            query.andWhere('LOWER(task.description) LIKE LOWER(:search))',
                { search: `%${search}%` })
        }

        try {
            const tasks = await query.getMany();
            return tasks;
        } catch (error) {
            this.logger.error(`Fail get task category for user: "${user.username}",
             Filters: ${JSON.stringify(filterDto)}`, error.stask);
            throw new InternalServerErrorException();
        }

    }

    async updateTaskCategoryStatus(id: string, status: TaskCategoryStatus, user: User): Promise<TaskCategory> {
        const taskCategory = await this.findOne({ where: { id: id, user: user } });
        taskCategory.status = status;
        try {
            await this.save(taskCategory);
            return taskCategory;
        } catch (error) {
            this.logger.error(`Fail user: "${user.username}",
             try update status task: ${JSON.stringify(status)}`, error.stask);
            throw new InternalServerErrorException();
        }

    }
}