import { Movie } from "../../1entidades/Movie";
import 'reflect-metadata';

export default interface MovieServiceInterface {
    getMovies(): Promise<Movie[]>;
    getMovieById(id: number): Promise<Movie | undefined>;
    createMovie(movie: Movie): Promise<Movie>;
    deleteMovie(id: number): Promise<boolean>;
    updateMovie(id: number, updatedData: Partial<Movie>): Promise<Movie>;
}