export type MovieSchema = {
    id: number;
    title: string;
    year: number;
    runtime: number;
    watched: boolean;
    rating?: number;
}