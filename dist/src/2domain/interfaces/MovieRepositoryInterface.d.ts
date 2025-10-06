import { Movie } from '../../1entidades/Movie';
interface MovieRepositoryInterface {
    getMovies(): Movie[];
    getMovieById(id: number): Movie | undefined;
    createMovie(movie: Movie): Movie;
    deleteMovie(id: number): boolean;
    updateMovie(id: number, updatedData: Partial<Movie>): Movie | undefined;
}
export default MovieRepositoryInterface;
//# sourceMappingURL=MovieRepositoryInterface.d.ts.map