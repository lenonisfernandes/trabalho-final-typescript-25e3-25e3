import { Router, Request, Response } from 'express';
import MovieServiceInterface from "../../2domain/interfaces/MovieServiceInterface";
declare class MovieController {
    private readonly movieService;
    router: Router;
    constructor(movieService: MovieServiceInterface);
    private routes;
    getMovies(req: Request, res: Response): Promise<void>;
    getMovieById(req: Request, res: Response): Promise<void>;
    createMovie(req: Request, res: Response): Promise<void>;
    deleteMovie(req: Request, res: Response): Promise<void>;
    updateMovie(req: Request, res: Response): Promise<void>;
}
export default MovieController;
//# sourceMappingURL=MovieController.d.ts.map