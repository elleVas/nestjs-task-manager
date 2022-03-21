import { IsNotEmpty } from 'class-validator';
import { TaskCategory } from 'src/tasks-category/dto/tasks-category.entity';
export class CreateTaskDto {
    @IsNotEmpty()
    title: string;
    
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    taskCategory: TaskCategory;
}
