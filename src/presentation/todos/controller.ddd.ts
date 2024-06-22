import { Request, Response } from "express"
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";

 

export class TodosController {
    //* DI
    constructor(
        private readonly todoRepository : TodoRepository,
    ) {}

    public getTodos =  async(req:Request, res:Response) => {
        const todos = await this.todoRepository.getAll();
        return res.json(todos);
        //instancias de todo entity
    }

    public getTodoById = async(req:Request, res:Response) => {
        const id =  +req.params.id;
 
       try {
       const todo = await this.todoRepository.findById(id);

       res.json(todo);

       }catch (e) {
                res.status(400).json({e});
       }
    };

    public createTodo = async(req:Request, res:Response) => {


        const  [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({error});


 const todo = await this.todoRepository.create(createTodoDto!);
 res.json(todo);

    };

    public updateTodo = async(req:Request, res:Response) => {
        const id =  +req.params.id ;  //recuerda aqui usamos el id del url , no eñ de el body
        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});
        if (error  ) return res.status(400).json({error});
        if (isNaN(id)) return res.status(400).json({error : 'ID argument is not a number'});

        const updateTodo = await this.todoRepository.updateById(updateTodoDto!);
        return res.json(updateTodo);

         
 



    }
    // public deleteTodoF = (req:Request, res:Response) => {
    //     const id =  Number(req.params.id );
    //      if (!id) return res.status(404).json({error : `El eleemnto con el id ${id} no existe`});
    //     const del = todos[id - 1];
    

    //      todos.splice(id - 1 , 1);
    //     res.json(del);
         
  
    // }

    public deleteTodo = async(req:Request, res:Response) => { 
   const id = + req.params.id ;

 const deletedTodo = await this.todoRepository.deleteById(id);
 res.json(deletedTodo);
 
  }
}


//ponete a estudiar prisma 




//express validator

//controlador donde vamos a elaborar la logica relacionad a al atarea o injectar servicios



//con esyo implemetntamos el praton llamado Doamin Driven Desing
//basado en repositorios, datasources y separacion de responsabilidad

