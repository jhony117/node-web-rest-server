import { Request, Response } from "express"
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

 

export class TodosController {
    //* DI
    constructor() {}

    public getTodos =  async(req:Request, res:Response) => {
        const todos  = await prisma.todo.findMany();
       return res.json(todos);
    }

    public getTodoById = async(req:Request, res:Response) => {
        const id =  +req.params.id;
        if (isNaN(id)) return res.status(400).json({error : 'ID argument is not a number'});
         const todo = await prisma.todo.findFirst({where: {
            id: id,
          },
          });

         (todo)
         ? res.json(todo)
         : res.status(404).json({error : `TODO with id ${id}`})
    }

    public createTodo = async(req:Request, res:Response) => {


        const  [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({error});



           const todo = await prisma.todo.create({
                data :  createTodoDto!
            });

     

        res.json(todo);

    };

    public updateTodo = async(req:Request, res:Response) => {
        const id =  +req.params.id ;
        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});
        if (error  ) return res.status(400).json({error});
        if (isNaN(id)) return res.status(400).json({error : 'ID argument is not a number'});

        const todo = await prisma.todo.findFirst({where: {
            id: id,
          },
          });
       
        if (!todo) return res.status(404).json({error : `TODO with id ${id} not found`});

        
  const updatedTodo = prisma.todo.update({
            where : {
                    id : id
            },
            data : updateTodoDto!.values

        });
        
   


        res.json(updatedTodo);
 



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


   const todo =  await prisma.todo.delete({
    where : {
        id: id
    }
   });
   if (!todo) return res.status(404).json({error : `El eleemnto con el id ${id} no existe`});
     res.json(todo);
    }
}


//ponete a estudiar prisma 




//express validator