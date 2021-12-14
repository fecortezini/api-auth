import { Router } from 'express'
import UsersController from '../controller/usersController';
import authMiddleware from "../middleware/auth"


const usersRouter = Router();

usersRouter.get('/', UsersController.getAllDataDb)
usersRouter.get('/:id', UsersController.getDataDb)

usersRouter.post('/', UsersController.postDataDb)
usersRouter.post('/auth', UsersController.postDataLogin)

usersRouter.put('/:id', authMiddleware, UsersController.putDataDb)

usersRouter.delete('/:id', authMiddleware, UsersController.delDataDb)

export default usersRouter;