import MovieRepository from '../Infra/MovieRepository';
import MovieService from '../domain/services/MovieService';
import { MovieSchema } from '../Infra/MovieSchema';

jest.mock('../Infra/MovieRepository');
describe('MovieService', () => {
    // Adicione seus testes aqui
    let movieService: MovieService;
    let movieRepository: jest.Mocked<MovieRepository>;

    beforeEach(() => {
        movieRepository = new MovieRepository() as jest.Mocked<MovieRepository>;
        movieService = new MovieService(movieRepository);
    });

    afterAll(() => {
        jest.resetAllMocks();
    });

    describe('buscar todos', () => {
             it('deve retornar o filme correspondente ao id fornecido', () => {
            movieRepository = new MovieRepository() as jest.Mocked<MovieRepository>;
            movieService = new MovieService(movieRepository);
            const mockMovie: MovieSchema = { id: 1, title: "Filme falso", year: 2020, runtime: 120, watched: false };

            movieRepository.getMovieById.mockReturnValue(mockMovie);

            const movie = movieService.getMovieById(1);

            expect(movieRepository.getMovieById).toHaveBeenCalledWith(1);

            expect(movie).toEqual(mockMovie);
        });

        it('deve retornar um erro se o filme não for encontrado', () => {
            movieRepository.getMovieById.mockReturnValue(undefined);

            expect(() => movieService.getMovieById(999)).toThrow('Filme não encontrado.');
            expect(movieRepository.getMovieById).toHaveBeenCalledWith(999);
        });
    });

});