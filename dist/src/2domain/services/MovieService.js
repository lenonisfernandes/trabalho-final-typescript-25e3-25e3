"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = __importDefault(require("../exceptions/CustomError"));
const inversify_1 = require("inversify");
require("reflect-metadata");
let MovieService = class MovieService {
    constructor(movieRepository) {
        this.movieRepository = movieRepository;
    }
    async getMovies() {
        return await this.movieRepository.getMovies();
    }
    async getMovieById(id) {
        const movie = await this.movieRepository.getMovieById(id);
        if (!movie) {
            throw new CustomError_1.default('Filme não encontrado.', 404);
        }
        return movie;
    }
    async createMovie(movie) {
        return await this.movieRepository.createMovie(movie);
    }
    async deleteMovie(id) {
        const result = await this.movieRepository.deleteMovie(id);
        if (!result) {
            throw new CustomError_1.default("Não foi possível realizar a exclusão.", 404);
        }
        return result;
    }
    async updateMovie(id, updatedData) {
        const updatedMovie = await this.movieRepository.updateMovie(id, updatedData);
        if (!updatedMovie) {
            throw new CustomError_1.default('Filme não encontrado para atualização.', 404);
        }
        return updatedMovie;
    }
};
MovieService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('MovieRepository'))
], MovieService);
exports.default = MovieService;
//# sourceMappingURL=MovieService.js.map