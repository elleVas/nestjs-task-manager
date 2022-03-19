import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { Task } from "src/tasks/dto/task.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaskCategoryStatus } from "../tasks-category-status.enum";

@Entity()
export class TaskCategory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

    @Column()
    status: TaskCategoryStatus;

    @ManyToOne(_type => User, (user) => user.task, { eager: false })
    @Exclude({ toPlainOnly: true })
    user: User;

    @OneToMany(_type => Task, (task) => task.taskCategory, { eager: true })
    task: Task[];

}