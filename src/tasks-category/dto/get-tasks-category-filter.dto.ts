import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskCategoryStatus } from "../tasks-category-status.enum";

export class GetTaskCategoryFilterDto {
    @IsOptional()
    @IsEnum(TaskCategoryStatus)
    status?: TaskCategoryStatus;
    
    @IsOptional()
    @IsString()
    search?: string;
}