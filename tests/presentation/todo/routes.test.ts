import request from 'supertest';
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgres';


describe('Todo route testing', () => {

   beforeAll(async() => {
         await   testServer.start();
         
      

        });

        afterAll(() => {
            testServer.close();
        })

        beforeEach(async() => {
            await prisma.todo.deleteMany();

        });

        const  todo1 = {text : 'hola mundo 1 '};
        const  todo2 = {text : 'hola mundo 2 '};

    test('should return todos',async () => {

        await prisma.todo.createMany({
            data : [todo1, todo2]
        });


     
    const {body} = await  request(testServer.app)
        .get('/api/todos')
        .expect(200);


        expect(body).toBeInstanceOf(Array);
        expect(body.length).toBe(2);

    

    });

    test('should retuern a TODO api/todos/:id', async() => {


        const todo =  await prisma.todo.create({ data : todo1 });

     const {body} = await request(testServer.app)
        .get(`/api/todos/${todo.id}`)


        expect(body).toEqual({
         id :  todo.id  ,
         text : todo.text ,
         completedAt :todo.completedAt ,
        })
    });

    test('shoul return a 404 not found  TODO api/todos/:id' , async() => {
   //     await prisma.todo.delete({where : {id :999}});

        const todo =  await prisma.todo.create({ data : todo1 });
 

        const todoId = 999;
        const {body} = await request(testServer.app)
           .get(`/api/todos/${todoId}`)
           .expect(404)


           expect(body).toEqual({ error: `Todo with id ${todoId} not found` });
   
    

    });

    test('should return  A NEW todo api/todos', async() => {

        const {body} =  await request(testServer.app)
        .post('/api/todos')
        .send(todo1)
        .expect(201);

        expect(body).toEqual({
            id : expect.any(Number),
            text: todo1.text,
            completedAt :null ,
        });
    });

    test('should return  an error if text is not present  api/todos', async() => {

        const {body} =  await request(testServer.app)
        .post('/api/todos')
        .send({})
        .expect(400);

       expect(body).toEqual({ error: 'Text property is required' });
     
    });

    test('should return  an error if text is empty  api/todos', async() => {

        const {body} =  await request(testServer.app)
        .post('/api/todos')
        .send({text : ''})
        .expect(400);

       expect(body).toEqual({ error: 'Text property is required' });
     
    });

    test('should return  an updated todo  api/todos/:id', async() => {

        const todo = await prisma.todo.create({data :todo1});

        const {body} =  await request(testServer.app)
        .put(`/api/todos/${todo.id}`)
        .send({text : 'hola! mundo UPDATE', completedAt : '2023-10-21'})
        .expect(200);
//! internal server error ???

        expect(body).toEqual({
            id :expect.any(Number),
            text : 'hola! mundo UPDATE',
            completedAt : '2023-10-21T00:00:00.000Z'
        })

      // expect(body).toEqual({ error: 'Text property is required' });
     
    });
    //TODO : relizar al operacion con errores perzonalizados 

    test('sloud return 404 if TODO not found ', async()=> {
            


            const todoId = 999 ; 
            const {body} = await request(testServer.app)
            .put(`/api/todos/${todoId}`)
            .send({text :'something'})
            .expect(404)
            //! internal server error ???

           expect(body).toEqual({error : `Todo with id ${todoId} not found`});
    });

    test('sloud return an updated TOOD only the date ', async()=> {

        const todo = await prisma.todo.create({data :todo1});

        const {body} =  await request(testServer.app)
        .put(`/api/todos/${todo.id}`)
        .send({completedAt : '2023-10-21'})
        .expect(200);
    //! internal server error ???
        expect(body).toEqual({
            id :expect.any(Number),
            text : 'hola mundo 1 ',
            completedAt : '2023-10-21T00:00:00.000Z'
        })
    });

    test('shoul delete a TODO api/todos/:id', async() => {
//funciona

        const todo = await prisma.todo.create({data :todo1});

        const {body} =await request(testServer.app)
        .delete(`/api/todos/${todo.id}`)
        .expect(200)

        expect(body).toEqual({
            id : expect.any(Number),
            text : todo.text,
            completedAt:null ,
        })

    });


//TODO : cambiar  a 404 
    test('shoul return 404 if  TODO do not exist api/todos/:id', async() => {
        //funciona
        
        
                const {body} =await request(testServer.app)
                .delete(`/api/todos/9999`)
                .expect(404)
        
               expect(body).toEqual({ error: 'Todo with id 9999 not found' });

        
            });
});

//prubar los DTOs 