import { Module } from '@nestjs/common';
import { TasksCategoryController } from './tasks-category.controller';
import { TasksCategoryService } from './tasks-category.service';
import { TasksCategoryRepository } from './dto/tasks-category.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TasksCategoryRepository]), 
    AuthModule],
  controllers: [TasksCategoryController],
  providers: [TasksCategoryService]
})
export class TasksCategoryModule {}

