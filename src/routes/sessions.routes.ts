import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';
const sessionsRouter = Router();

interface userResponse {
  name: string;
  email: string;
  password?: string;
}

sessionsRouter.post('/', async (request, response) => {

  const { email, password } = request.body;
  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  const userResponse: userResponse = user;
  delete userResponse.password;

  return response.json({ userResponse, token });

});

export default sessionsRouter;
