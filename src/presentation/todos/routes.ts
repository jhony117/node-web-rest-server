import { Router } from "express";
import { TodosController } from "./controller";


export class TodoRoutes {


    static get routes(): Router {
        const router = Router();
        const todoController = new TodosController();

        router.get('/',(req, res) => todoController.getTodos(req, res) );

        router.get('/:id',(req, res) => todoController.getTodoById(req, res) );
      
        //? los callback de arriva y abajo son el mismo 

        router.post('/', todoController.createTodo);

        router.put('/:id', todoController.updateTodo);

        router.delete('/:id', todoController.deleteTodo);



  return router;
    }
}