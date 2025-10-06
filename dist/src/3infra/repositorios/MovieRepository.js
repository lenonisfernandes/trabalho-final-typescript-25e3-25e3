"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const CustomError_1 = __importDefault(require("../../2domain/exceptions/CustomError"));
const inversify_1 = require("inversify");
let MovieRepository = class MovieRepository {
    constructor(caminho = 'fakeBD.json') {
        this.caminhoArquivo = path_1.default.join(__dirname, caminho);
    }
    accessBD() {
        try {
            const data = fs_1.default.readFileSync(this.caminhoArquivo, { encoding: 'utf-8' });
            return JSON.parse(data);
        }
        catch (error) {
            console.error('Erro ao acessar o banco de dados:', error);
            return { movies: [] };
        }
    }
    reescreverBD(dados) {
        try {
            fs_1.default.writeFileSync(this.caminhoArquivo, JSON.stringify(dados, null, 2));
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    getMovies() {
        const db = this.accessBD();
        return db.movies;
    }
    getMovieById(id) {
        return this.accessBD().movies.find(movie => movie.id === id);
    }
    createMovie(movie) {
        const movies = this.getMovies();
        const idExistentes = movies.map(m => m.id);
        const novoId = Math.max(...idExistentes) + 1;
        movie.id = novoId;
        movies.push({ ...movie });
        const BDAtualizado = this.accessBD();
        BDAtualizado.movies = movies;
        this.reescreverBD(BDAtualizado);
        return movie;
    }
    deleteMovie(id) {
        const movies = this.getMovies();
        const movieIndex = movies.findIndex(movie => movie.id === id);
        if (movieIndex !== -1) {
            movies.splice(movieIndex, 1);
            const BDAtualizado = this.accessBD();
            BDAtualizado.movies = movies;
            return this.reescreverBD(BDAtualizado);
        }
        throw new CustomError_1.default('Filme não encontrado para exclusão.', 404);
    }
    updateMovie(id, updatedData) {
        const movies = this.getMovies();
        const movieIndex = movies.findIndex(movie => movie.id === id);
        if (movieIndex !== -1 && movies[movieIndex]) {
            movies[movieIndex] = {
                ...movies[movieIndex],
                ...updatedData,
                id,
                title: updatedData.title !== undefined ? updatedData.title : movies[movieIndex].title,
                year: updatedData.year !== undefined ? updatedData.year : movies[movieIndex].year,
                runtime: updatedData.runtime !== undefined ? updatedData.runtime : movies[movieIndex].runtime,
                watched: updatedData.watched !== undefined ? updatedData.watched : movies[movieIndex].watched
            };
            const BDAtualizado = this.accessBD();
            BDAtualizado.movies = movies;
            return this.reescreverBD(BDAtualizado) ? movies[movieIndex] : undefined;
        }
        return undefined;
    }
};
MovieRepository = __decorate([
    (0, inversify_1.injectable)()
], MovieRepository);
exports.default = MovieRepository;
//# sourceMappingURL=MovieRepository.js.map