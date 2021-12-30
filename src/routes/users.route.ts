import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import DatabaseError from '../errors/database.error';
import userRepository from '../repositories/user.repository';

const usersRoute = Router();


usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
	
	const users = await userRepository.findAllUsers();
	
	res.status(StatusCodes.OK).send(users);
});

usersRoute.get('/users/:uuid', async (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
	
	try {

		const uuid = req.params.uuid;
	
		const user = await userRepository.findUserById(uuid);
	
		res.status(StatusCodes.OK).send(user);

	} catch (error) {
		if (error instanceof DatabaseError) {
			res.sendStatus(StatusCodes.BAD_REQUEST);
		} else {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR);
		}
	}
});

usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction) => {

	const newUser = req.body;

	const uuid = await userRepository.createUser(newUser);

	res.send(StatusCodes.CREATED).send(uuid);
});

usersRoute.put('/users/:uuid', async (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
	
	const uuid = req.params.uuid;

	const modifiedUser = req.body;
	modifiedUser.uuid = uuid;

	await userRepository.updateUser(modifiedUser);

	res.status(StatusCodes.OK).send();
});

usersRoute.delete('/users/:uuid', async (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
	
	const uuid = req.params.uuid;
	
	await userRepository.deleteUser(uuid);

	res.sendStatus(StatusCodes.OK);
});

export default usersRoute;
