import { Movie } from '../../1entidades/Movie';

interface MovieRepositoryAsyncInterface {
    getMovies(): Promise<Movie[]>;
    getMovieById(id: number): Promise<Movie | undefined>;
    createMovie(movie: Movie): Promise<Movie>;
    deleteMovie(id: number): Promise<boolean>;
    updateMovie(id: number, updatedData: Partial<Movie>): Promise<Movie | undefined>;
}

export default MovieRepositoryAsyncInterface;
