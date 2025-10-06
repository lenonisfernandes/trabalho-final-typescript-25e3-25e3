import CustomError from "../exceptions/CustomError";
import { Movie } from "../../1entidades/Movie";
import MovieRepositoryInterface from "../interfaces/MovieRepositoryInterface";
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import MovieServiceInterface from "../interfaces/MovieServiceInterface";

@injectable()
export default class MovieService implements MovieServiceInterface {
    private readonly movieRepository: MovieRepositoryInterface;

    constructor(
        @inject('MovieRepositoryMongoose') 
        movieRepository: MovieRepositoryInterface
    ) {
        this.movieRepository = movieRepository;
    }

    async getMovies(): Promise<Movie[]> {
        return await this.movieRepository.getMovies();
    }

    async getMovieById(id: number): Promise<Movie | undefined> {
        const movie = await this.movieRepository.getMovieById(id);
        if(!movie) {
            throw new CustomError('Filme não encontrado.', 404);
        }
        return movie;
    }

    async createMovie(movie: Movie): Promise<Movie> {
        return await this.movieRepository.createMovie(movie);
    }

    async deleteMovie(id: number): Promise<boolean> {
        const result = await this.movieRepository.deleteMovie(id);
        if (!result) {
            throw new CustomError("Não foi possível realizar a exclusão.", 404);
        }
        return result;
    }

    async updateMovie(id: number, updatedData: Partial<Movie>): Promise<Movie> {
        const updatedMovie = await this.movieRepository.updateMovie(id, updatedData);
        if (!updatedMovie) {
            throw new CustomError('Filme não encontrado para atualização.', 404);
        }
        return updatedMovie;
    }

}