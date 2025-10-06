export declare class Movie {
    id: number;
    title: string;
    year: number;
    runtime: number;
    watched: boolean;
    rating?: number;
    constructor(id: number, title: string, year: number, runtime: number, watched?: boolean, rating?: number);
}
export type CriarMovieDTO = Omit<Movie, 'id'>;
export type ViewMovieDTO = Pick<Movie, 'id' | 'title' | 'year'>;
export type AtualizarMovieDTO = Partial<CriarMovieDTO>;
//# sourceMappingURL=Movie.d.ts.map