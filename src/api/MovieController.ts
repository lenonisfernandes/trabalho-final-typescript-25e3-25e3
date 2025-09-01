import MovieService from "../domain/services/MovieService";
import MovieRepository from "../Infra/MovieRepository";
import { MovieSchema } from "../Infra/MovieSchema";
import { Movie, ViewMovieDTO } from "../Movie";
import { Router, Request, Response } from 'express';
import { body, validationResult, param } from 'express-validator';


class MovieController {
    private readonly movieRepository: MovieRepository;
    private readonly movieService: MovieService;
    public router: Router = Router();

    constructor(movieRepository: MovieRepository, movieService: MovieService) {
        this.movieRepository = movieRepository;
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

    getMovies(req: Request, res: Response) {
        const movies: MovieSchema[] = this.movieService.getMovies();
        const moviesDTO: ViewMovieDTO[] = movies.map(movie => ({
            id: movie.id,
            title: movie.title,
            year: movie.year
        }));
        res.json(moviesDTO);
    }

    getMovieById(req: Request, res: Response) {
        const { id } = req.params;
        const movie = this.movieService.getMovieById(Number(id));
        res.status(200).json(movie);
    }

    createMovie(req: Request, res: Response) {
        const movieData: Movie = req.body;
        const newMovie = this.movieService.createMovie(movieData);
        res.status(201).json(newMovie);
    }

    deleteMovie(req: Request, res: Response) {
        const { id } = req.params;
        this.movieService.deleteMovie(Number(id));
        res.status(204).json("Exclusão realizada com sucesso.");
    }

    updateMovie(req: Request, res: Response) {
        const { id } = req.params;
        const updatedData: Partial<Movie> = req.body;
        const updatedMovie = this.movieService.updateMovie(Number(id), updatedData);
        res.status(200).json(updatedMovie);
    }
}

export default MovieController;