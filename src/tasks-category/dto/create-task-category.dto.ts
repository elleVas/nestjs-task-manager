import { IsNotEmpty } from 'class-validator';
export class CreateTaskCategoryDto {
    
    @IsNotEmpty()
    description: string;
}
