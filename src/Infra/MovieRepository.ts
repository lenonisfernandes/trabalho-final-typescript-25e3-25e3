import path from 'path';
import fs from 'fs';
import { BDSchema } from './BDSchema';
import { MovieSchema } from './MovieSchema';
import { Movie } from '../Movie';
import CustomError from '../api/exceptions/CustomError';

export default class MovieRepository {
    private caminhoArquivo: string;
    
    constructor(caminho: string = 'fakeBD.json') {
        this.caminhoArquivo = path.join(__dirname, caminho);
    }

    private accessBD() : BDSchema {
        try {
            const data = fs.readFileSync(this.caminhoArquivo, { encoding: 'utf-8' });
            return JSON.parse(data);
        } catch (error) {
            console.error('Erro ao acessar o banco de dados:', error);
            return { movies: [] };
        }
    }

    private reescreverBD(dados: BDSchema):boolean {
        try {
            fs.writeFileSync(this.caminhoArquivo, JSON.stringify(dados, null, 2));
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    public getMovies() {
        const db = this.accessBD();
        return db.movies;
    }

    public getMovieById(id: number): MovieSchema | undefined {
        return this.accessBD().movies.find(movie => movie.id === id);
    }

    public createMovie(movie: Movie): MovieSchema[] {
        const movies = this.getMovies();
        const idExistentes = movies.map(m => m.id);
        const novoId = Math.max(...idExistentes) + 1;
        movie.id = novoId;
        movies.push({...movie});
        const BDAtualizado = this.accessBD();
        BDAtualizado.movies = movies;
        this.reescreverBD(BDAtualizado);
        return movies;
    }

    public deleteMovie(id: number): boolean {
        const movies = this.getMovies();
        const movieIndex = movies.findIndex(movie => movie.id === id);
        if (movieIndex !== -1) {
            movies.splice(movieIndex, 1);
            const BDAtualizado = this.accessBD();
            BDAtualizado.movies = movies;
            return this.reescreverBD(BDAtualizado);
        }
        throw new CustomError('Filme não encontrado para exclusão.', 404);
    }

    public updateMovie(id: number, updatedData: Partial<Movie>): MovieSchema | undefined {
        const movies = this.getMovies();
        const movieIndex = movies.findIndex(movie => movie.id === id);
        if (movieIndex !== -1 && movies[movieIndex]) {
            movies[movieIndex] = { 
                ...movies[movieIndex], 
                ...updatedData, 
                id,
                title: updatedData.title !== undefined ? updatedData.title : movies[movieIndex]!.title,
                year: updatedData.year !== undefined ? updatedData.year : movies[movieIndex]!.year,
                runtime: updatedData.runtime !== undefined ? updatedData.runtime : movies[movieIndex]!.runtime,
                watched: updatedData.watched !== undefined ? updatedData.watched : movies[movieIndex]!.watched
            };
            const BDAtualizado = this.accessBD();
            BDAtualizado.movies = movies;
            return this.reescreverBD(BDAtualizado) ? movies[movieIndex] : undefined;
        }
        return undefined;
    }
}
