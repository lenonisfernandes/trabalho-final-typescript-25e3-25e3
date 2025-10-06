import 'reflect-metadata';
import MovieRepositoryAsyncInterface from "../../2domain/interfaces/MovieRepositoryAsyncInterface";
import { Movie } from "../../1entidades/Movie";
import DBModels from "./DBModels";
export default class MovieRepositoryMongoose implements MovieRepositoryAsyncInterface {
    private movieModel;
    constructor(dbModel: DBModels);
    getMovies(): Promise<Movie[]>;
    getMovieById(id: number): Promise<Movie | undefined>;
    createMovie(movie: Movie): Promise<Movie>;
    deleteMovie(id: number): Promise<boolean>;
    updateMovie(id: number, updatedData: Partial<Movie>): Promise<Movie | undefined>;
}
//# sourceMappingURL=MovieRepositoryMongoose.d.ts.map