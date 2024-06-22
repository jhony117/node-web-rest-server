import { CreateTodoDto } from './../dtos/todos/create-todo.dto';
//los datasources son objetos que nos sirvern para obligar a los demas a verse de cierta forma

import { TodoEntity } from '../entities/todo.entity';
import { UpdateTodoDto } from '../dtos';

export abstract class TodoRepository {

    abstract create(createTodoDto: CreateTodoDto) : Promise<TodoEntity>;

    //todo : paginacion
    abstract getAll(): Promise<TodoEntity[]>;

    abstract findById (id : number) : Promise<TodoEntity>;
    abstract updateById (updateTodoDto : UpdateTodoDto) : Promise<TodoEntity>;
    abstract deleteById (id : number) : Promise<TodoEntity>;
    


}