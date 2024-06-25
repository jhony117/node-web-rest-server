import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(async() => {

    main();
})();


function main() {
const server = new Server({
    port:envs.PORT,
    public_path : envs.PUBLIC_PATH, 
    routes : AppRoutes.routes,
});

server.start();
}

// config = configuraciones
// data  = diferentes formas con als cuales eccedemos a las db directamente
// domain =  reglas de negocio = origenees de datos , dtos, casos de uso , entidades , repositorios (y sus definiciones)
// infrestuctura  =  implementaciones de datasources y respositrry
// presentacion  =  los mas externo  , ejem , si el dia de mañana me pidieran cambiar express por fatify solo esto cambiaria 

// paquetes de 3ro reqiueren adaptador , 
        ///es posible adaptar expres pero seria muy grande el adaptador 
