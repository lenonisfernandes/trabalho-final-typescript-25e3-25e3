import { Movie } from '../../1entidades/Movie';
import MovieRepositoryInterface from '../../2domain/interfaces/MovieRepositoryInterface';
export default class MovieRepository implements MovieRepositoryInterface {
    private caminhoArquivo;
    constructor(caminho?: string);
    private accessBD;
    private reescreverBD;
    getMovies(): import("./MovieSchemaDriver").MovieSchemaDriver[];
    getMovieById(id: number): Movie | undefined;
    createMovie(movie: Movie): Movie;
    deleteMovie(id: number): boolean;
    updateMovie(id: number, updatedData: Partial<Movie>): Movie | undefined;
}
//# sourceMappingURL=MovieRepository.d.ts.map