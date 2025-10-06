import { Movie, ViewMovieDTO } from "../../1entidades/Movie";
import { Router, Request, Response } from 'express';
import { body, param } from 'express-validator';
import MovieServiceInterface from "../../2domain/interfaces/MovieServiceInterface";
import { inject, injectable } from 'inversify';

@injectable()
class MovieController {
    private readonly movieService: MovieServiceInterface;
    public router: Router = Router();

    constructor(
        @inject('MovieService')
        movieService: MovieServiceInterface
    ) {
        this.movieService = movieService;
        this.routes();
    }

    private routes() {
        this.router.get('/', [
            param('id').notEmpty().isNumeric().withMessage('ID deve ser um número válido.')
        ],this.getMovies.bind(this));
        this.router.get('/:id', this.getMovieById.bind(this));
        this.router.post('/', [
            body('title').notEmpty().withMessage('Título é obrigatório.'),
            body('year').notEmpty().withMessage('Ano é obrigatório.')
                .isNumeric().withMessage('Ano deve ser um número.'),
            body('runtime').notEmpty().withMessage('Duração é obrigatória.')
                .isNumeric().withMessage('Duração deve ser um número.')
        ], this.createMovie.bind(this));
        this.router.delete('/:id', this.deleteMovie.bind(this));
        this.router.patch('/:id', this.updateMovie.bind(this));
    }

    async getMovies(req: Request, res: Response) {
        const movies: Movie[] = await this.movieService.getMovies();
        const moviesDTO: ViewMovieDTO[] = movies.map(movie => ({
            id: movie.id,
            title: movie.title,
            year: movie.year
        }));
        res.json(moviesDTO);
    }

    async getMovieById(req: Request, res: Response) {
        const { id } = req.params;
        const movie = await this.movieService.getMovieById(Number(id));
        res.status(200).json(movie);
    }

    async createMovie(req: Request, res: Response) {
        const movieData: Movie = req.body;
        const newMovie = await this.movieService.createMovie(movieData);
        res.status(201).json(newMovie);
    }

    async deleteMovie(req: Request, res: Response) {
        const { id } = req.params;
        await this.movieService.deleteMovie(Number(id));
        res.status(204).json("Exclusão realizada com sucesso.");
    }

    async updateMovie(req: Request, res: Response) {
        const { id } = req.params;
        const updatedData: Partial<Movie> = req.body;
        const updatedMovie = await this.movieService.updateMovie(Number(id), updatedData);
        res.status(200).json(updatedMovie);
    }
}

export default MovieController;