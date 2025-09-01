import MovieRepository from "../Infra/MovieRepository";
import MovieService from "../domain/services/MovieService";
import MovieController from "./MovieController";
import { Router } from 'express';


const routes = Router();

const movieRepository = new MovieRepository();
const movieService = new MovieService(movieRepository);
const movieController = new MovieController(movieRepository, movieService);

routes.use('/movies', movieController.router);

export default routes;
