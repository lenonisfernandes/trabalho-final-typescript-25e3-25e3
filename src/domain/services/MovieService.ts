import CustomError from "../../api/exceptions/CustomError";
import MovieRepository from "../../Infra/MovieRepository";
import { Movie } from "../../Movie";

export default class MovieService {
    private readonly movieRepository: MovieRepository;

    constructor(movieRepository: MovieRepository) {
        this.movieRepository = movieRepository;
    }

    public getMovies() {
        return this.movieRepository.getMovies();
    }

    public getMovieById(id: number) {
        const movie = this.movieRepository.getMovieById(id);
        if(!movie) {
            throw new CustomError('Filme não encontrado.', 404);
        }
        return movie;
    }

    public createMovie(movie: Movie) {
        return this.movieRepository.createMovie(movie);
    }

    public deleteMovie(id: number) {
        if(!this.movieRepository.deleteMovie(id)) {
            throw new CustomError("Não foi possível realizar a exclusão.", 404);
        }
    }

    public updateMovie(id: number, updatedData: Partial<Movie>) {
        return this.movieRepository.updateMovie(id, updatedData);
    }

}