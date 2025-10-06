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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const inject_1 = require("@inversifyjs/core/lib/cjs/metadata/decorators/inject");
let MovieController = class MovieController {
    constructor(movieService) {
        this.router = (0, express_1.Router)();
        this.movieService = movieService;
        this.routes();
    }
    routes() {
        this.router.get('/', [
            (0, express_validator_1.param)('id').notEmpty().isNumeric().withMessage('ID deve ser um número válido.')
        ], this.getMovies.bind(this));
        this.router.get('/:id', this.getMovieById.bind(this));
        this.router.post('/', [
            (0, express_validator_1.body)('title').notEmpty().withMessage('Título é obrigatório.'),
            (0, express_validator_1.body)('year').notEmpty().withMessage('Ano é obrigatório.')
                .isNumeric().withMessage('Ano deve ser um número.'),
            (0, express_validator_1.body)('runtime').notEmpty().withMessage('Duração é obrigatória.')
                .isNumeric().withMessage('Duração deve ser um número.')
        ], this.createMovie.bind(this));
        this.router.delete('/:id', this.deleteMovie.bind(this));
        this.router.patch('/:id', this.updateMovie.bind(this));
    }
    async getMovies(req, res) {
        const movies = await this.movieService.getMovies();
        const moviesDTO = movies.map(movie => ({
            id: movie.id,
            title: movie.title,
            year: movie.year
        }));
        res.json(moviesDTO);
    }
    async getMovieById(req, res) {
        const { id } = req.params;
        const movie = await this.movieService.getMovieById(Number(id));
        res.status(200).json(movie);
    }
    async createMovie(req, res) {
        const movieData = req.body;
        const newMovie = await this.movieService.createMovie(movieData);
        res.status(201).json(newMovie);
    }
    async deleteMovie(req, res) {
        const { id } = req.params;
        await this.movieService.deleteMovie(Number(id));
        res.status(204).json("Exclusão realizada com sucesso.");
    }
    async updateMovie(req, res) {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedMovie = await this.movieService.updateMovie(Number(id), updatedData);
        res.status(200).json(updatedMovie);
    }
};
MovieController = __decorate([
    __param(0, (0, inject_1.inject)('MovieService'))
], MovieController);
exports.default = MovieController;
//# sourceMappingURL=MovieController.js.map