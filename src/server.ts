import express from 'express';
// express não consegue lidar com erros assincronos
// express-async-errors é uma forma de tratar erros atraves de middlewares
import 'express-async-errors';
import onError from './middlewares/onError';
import setHeader from './middlewares/setHeader';
import router from './routes';

const server = express();

server.use(express.json());

server.use(setHeader);

server.use(router);

server.use(onError);

server.listen(3030, () => 'server rodando na porta 3030');
