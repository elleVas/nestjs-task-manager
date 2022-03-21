import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { TaskCategory } from "src/tasks-category/dto/tasks-category.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "../task-status.enum";

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;

    @CreateDateColumn({ nullable: true, type: 'timestamp with time zone' })
    createdAt: Date;

    @Column({ nullable: true, type: 'timestamp with time zone' })
    expireDate: Date;

    @ManyToOne(_type => User, (user) => user.task, { eager: false })
    @Exclude({ toPlainOnly: true })
    user: User;

    @ManyToOne(_type => TaskCategory, (taskCategory) => taskCategory.task, { eager: false })
   // @Exclude({ toPlainOnly: true })
    taskCategory: TaskCategory;

}