import 'reflect-metadata';
import { inject, injectable } from "inversify";
import MovieRepositoryAsyncInterface from "../../2domain/interfaces/MovieRepositoryAsyncInterface";
import { Movie } from "../../1entidades/Movie";
import { Model } from "mongoose";
import DBModels from "./DBModels";

@injectable()
export default class MovieRepositoryMongoose implements MovieRepositoryAsyncInterface {
    private movieModel = Model<Movie>;

    constructor(@inject('DBModels') dbModel: DBModels) {
        this.movieModel = dbModel.movieModel;
    }

    async getMovies(): Promise<Movie[]> {
        return await this.movieModel.find();
    }

    async getMovieById(id: number): Promise<Movie | undefined> {
        return await this.movieModel.findOne({ id }) ?? undefined;
    }

    async createMovie(movie: Movie): Promise<Movie> {
        const movies = await this.getMovies();
        const maxId = movies.reduce((max, movie) => movie.id > max ? movie.id : max, 0);
        movie.id = maxId + 1;    
        const createdMovie = await this.movieModel.create(movie);
        return createdMovie;
    }

    async deleteMovie(id: number): Promise<boolean> {
        const result = await this.movieModel.deleteOne({ id });
        return result.deletedCount > 0;
    }

    async updateMovie(id: number, updatedData: Partial<Movie>): Promise<Movie | undefined> {
        const result = await this.movieModel.findOneAndUpdate({ id }, updatedData, { new: true });
        return result ?? undefined;
    }  

}