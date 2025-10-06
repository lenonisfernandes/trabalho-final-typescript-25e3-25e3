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
require("reflect-metadata");
const inversify_1 = require("inversify");
const mongoose_1 = require("mongoose");
let MovieRepositoryMongoose = class MovieRepositoryMongoose {
    constructor(dbModel) {
        this.movieModel = (mongoose_1.Model);
        this.movieModel = dbModel.movieModel;
    }
    async getMovies() {
        return await this.movieModel.find();
    }
    async getMovieById(id) {
        return await this.movieModel.findOne({ id }) ?? undefined;
    }
    async createMovie(movie) {
        const createdMovie = await this.movieModel.create(movie);
        return createdMovie;
    }
    async deleteMovie(id) {
        const result = await this.movieModel.deleteOne({ id });
        return result.deletedCount > 0;
    }
    async updateMovie(id, updatedData) {
        const result = await this.movieModel.findOneAndUpdate({ id }, updatedData, { new: true });
        return result ?? undefined;
    }
};
MovieRepositoryMongoose = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('DBModels'))
], MovieRepositoryMongoose);
exports.default = MovieRepositoryMongoose;
//# sourceMappingURL=MovieRepositoryMongoose.js.map