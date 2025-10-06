import { Movie } from "../../1entidades/Movie";
import MovieRepositoryInterface from "../interfaces/MovieRepositoryInterface";
import 'reflect-metadata';
import MovieServiceInterface from "../interfaces/MovieServiceInterface";
export default class MovieService implements MovieServiceInterface {
    private readonly movieRepository;
    constructor(movieRepository: MovieRepositoryInterface);
    getMovies(): Promise<Movie[]>;
    getMovieById(id: number): Promise<Movie | undefined>;
    createMovie(movie: Movie): Promise<Movie>;
    deleteMovie(id: number): Promise<boolean>;
    updateMovie(id: number, updatedData: Partial<Movie>): Promise<Movie>;
}
//# sourceMappingURL=MovieService.d.ts.map