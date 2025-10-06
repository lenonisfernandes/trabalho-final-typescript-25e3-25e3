import MovieController from "./controllers/MovieController";
import { Router } from 'express';
import container from './config/InversifyConfig';


const routes = Router();

const movieController = container.get<MovieController>("MovieController");

routes.use('/movies', movieController.router);

export default routes;
