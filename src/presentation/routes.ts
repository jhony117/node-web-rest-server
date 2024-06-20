import { Router } from "express";
import { TodosController } from "./todos/controller";
import { TodoRoutes } from "./todos/routes";


export class AppRoutes {


    static get routes(): Router {
        const router = Router();
        const todoController = new TodosController();

        //? .use -> middleware -> funcion que se ejecuta cuneda la ruta pasa por aqui
        router.use('/api/todos', TodoRoutes.routes );
 

        return router;
    }
}


//* rutas de aplicacion 
  ///* subrutas 
   ////* controlador , es e que maneja la funcion de la respuesta
