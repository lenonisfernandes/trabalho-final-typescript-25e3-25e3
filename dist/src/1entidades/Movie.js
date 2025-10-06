"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
class Movie {
    constructor(id, title, year, runtime, watched = false, rating) {
        this.watched = false;
        this.id = id;
        this.title = title;
        this.year = year;
        this.runtime = runtime;
        this.watched = watched;
        this.rating = rating;
    }
}
exports.Movie = Movie;
//# sourceMappingURL=Movie.js.map