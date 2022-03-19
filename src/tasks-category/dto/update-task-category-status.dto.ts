import { IsEnum } from "class-validator";
import { TaskCategoryStatus } from "../tasks-category-status.enum";

export class updateTaskCategoryStatusDto {
    @IsEnum(TaskCategoryStatus)
    status: TaskCategoryStatus;
}