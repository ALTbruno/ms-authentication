import express, {Request, Response, NextFunction} from 'express';
import errorHandler from './middlewares/error-handler.middleware';
import authorizationRoute from './routes/authorization.route';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';
import jwtAuthenticationMiddleware from './middlewares/jwt-authentication.middleware';

const app = express();

// Configurações da aplicação
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Configurações de Rotas
app.use(statusRoute);
app.use(jwtAuthenticationMiddleware, usersRoute);
app.use(authorizationRoute);

// Configurações dos Hanflers de Erro
app.use(errorHandler);

// Inicialização do servidor
app.listen(3000, () => {
	console.log("Aplicação executando na porta 3000");
});
