import { Request, Response } from "express"
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { CreateTodo, CustomError, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from "../../domain";

 

export class TodosController {
    //* DI
    constructor(
        private readonly todoRepository : TodoRepository,
    ) {}

    private handleError = (res:Response, error: unknown) => {
            if(error instanceof CustomError ){
                    res.status(error.statusCode).json({error : error.message});
                    return;
            }

            res.status(500).json({error  :'Internal server error - check logs '})
    }

    public getTodos =  (req:Request, res:Response) => {
      new GetTodos(this.todoRepository)
            .execute()
            .then(todos => res.json(todos))
            .catch(error => this.handleError(res, error));
        //instancias de todo entity
    }

    public getTodoById = (req:Request, res:Response) => {
        const id =  +req.params.id;

        new GetTodo(this.todoRepository)
        .execute(id)
        .then(todo => res.json(todo))
        .catch(error => this.handleError(res, error));
     
    };

    public createTodo =  (req:Request, res:Response) => {


        const  [error, createTodoDto] = CreateTodoDto.create(req.body);
 
        if (error) return res.status(400).json({error});


        new CreateTodo(this.todoRepository)
        .execute(createTodoDto!)
        .then(todo => res.status(201).json(todo))
        .catch(error => this.handleError(res, error));
 

    };

    public updateTodo =  (req:Request, res:Response) => {
        const id =  +req.params.id ;  //recuerda aqui usamos el id del url , no eñ de el body
        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});
        if (error  ) return res.status(400).json({error});
        if (isNaN(id)) return res.status(400).json({error : 'ID argument is not a number'});

        new UpdateTodo(this.todoRepository)
        .execute(updateTodoDto!)
        .then(todo => res.json(todo))
        .catch(error => this.handleError(res, error));
         
 



    }
    // public deleteTodoF = (req:Request, res:Response) => {
    //     const id =  Number(req.params.id );
    //      if (!id) return res.status(404).json({error : `El eleemnto con el id ${id} no existe`});
    //     const del = todos[id - 1];
    

    //      todos.splice(id - 1 , 1);
    //     res.json(del);
         
  
    // }

    public deleteTodo = (req:Request, res:Response) => { 
   const id = + req.params.id ;
 

   new DeleteTodo(this.todoRepository)
   .execute(id)
   .then(todo => res.json(todo))
   .catch(error => this.handleError(res, error));

 
  }
}


//ponete a estudiar prisma 




//express validator

//controlador donde vamos a elaborar la logica relacionad a al atarea o injectar servicios



//con esyo implemetntamos el praton llamado Doamin Driven Desing
//basado en repositorios, datasources y separacion de responsabilidad

