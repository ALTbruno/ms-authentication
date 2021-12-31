import { Request, Response, NextFunction } from 'express';
import ForbiddenError from '../errors/forbidden.error';
import  JWT from 'jsonwebtoken';
import userRepository from '../repositories/user.repository';

async function jwtAuthenticationMiddleware(error: any, req: Request, res: Response, next: NextFunction) {
    
	try {

		const authorizationHeader = req.headers['authorization'];
	
		if (!authorizationHeader) {
			throw new ForbiddenError('Credenciais não informadas');
		}

		const [authenticationType, token] = authorizationHeader.split(' ');

		if (authenticationType !== 'Bearer' || !token) {
			throw new ForbiddenError('Tipo de autenticação inválido');
		}

		try {
			
			const tokePayload = JWT.verify(token, 'my_secret_key');
	
			if (typeof tokePayload !== 'object' || tokePayload.sub) {
				throw new ForbiddenError('Token Inválido');
			}
	
			const uuid = tokePayload.sub;
	
			const user = {uuid: tokePayload.sub, username: tokePayload.username};
	
			req.user = user; 
	
			next();

		} catch (error) {
			throw new ForbiddenError('Token Inválido');
		}

	} catch(error) {
		next(error);
	};

};

export default jwtAuthenticationMiddleware;
