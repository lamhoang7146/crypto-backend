import { Module } from '@nestjs/common';
import { TodoService } from '@/modules/todo/todo.service';
import { TodoResolver } from '@/modules/todo/todo.resolver';
import { PrismaService } from '@/modules/prisma/prisma.service';

@Module({
  providers: [TodoResolver, TodoService, PrismaService],
})
export class TodoModule { }
