import express, {Request, Response, ErrorRequestHandler}  from 'express';
import dotenv from 'dotenv';
import mustache from 'mustache-express';
import path from 'path';
import mainRoutes from './routes/index';
import cors from 'cors';
import { MulterError} from 'multer';



dotenv.config();


const server = express();

server.use(cors());

server.use(express.urlencoded({ extended: true }))
server.set('view engine','mustache');
server.set('views', path.join(__dirname, 'views'));
server.engine('mustache',mustache());

server.use(express.static(path.join(__dirname, '../public')));

server.use(mainRoutes);

server.use((req,res)=>{
    res.status(404);
    res.json({error: 'Endpoint não encontrado.'});
});

const errorHandler: ErrorRequestHandler = (err,req,res,next) => {
    res.status(400); //Bad Request
    if(err instanceof MulterError){
        res.json(`Erro por parte do envio${{error:err.code}}`);
    }else{
        console.log(err);
        res.json({error: 'Deu erro'})
    }
}
server.use(errorHandler);

server.listen(process.env.PORT);