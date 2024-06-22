import { Router } from "express";
import { TodosController } from "./controller";
import { TododatasourceImpl } from "../../infrastructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infrastructure/repositories/todo.repository.impl";


export class TodoRoutes {


    static get routes(): Router {
        const router = Router();

        const datasource = new TododatasourceImpl();
        const todoRepository = new TodoRepositoryImpl(datasource);
        const todoController = new TodosController(todoRepository);

        router.get('/',(req, res) => todoController.getTodos(req, res) );

        router.get('/:id',(req, res) => todoController.getTodoById(req, res) );
      
        //? los callback de arriva y abajo son el mismo 

        router.post('/', todoController.createTodo);

        router.put('/:id', todoController.updateTodo);

        router.delete('/:id', todoController.deleteTodo);



  return router;
    }
}