import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';
const usersRouter = Router();

interface userResponse {
  name: string;
  email: string;
  password?: string;
}

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user: userResponse = await createUser.execute({ name, email, password });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ errol: err.message });
  }
});

export default usersRouter;
