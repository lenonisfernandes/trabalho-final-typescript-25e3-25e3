export class Movie {
    id: number;
    title: string;
    year: number;
    runtime: number;
    watched: boolean = false;
    rating?: number;

    constructor(id: number, title: string, year: number, runtime: number, watched: boolean = false, rating?: number) {
        this.id = id;
        this.title = title;
        this.year = year;
        this.runtime = runtime;
        this.watched = watched;
        this.rating = rating;
    }
}

export type CriarMovieDTO = Omit<Movie, 'id'>;

export type ViewMovieDTO = Pick<Movie, 'id' | 'title' | 'year'>;

export type AtualizarMovieDTO = Partial<CriarMovieDTO>;