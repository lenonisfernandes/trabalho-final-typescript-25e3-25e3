import { injectable } from "inversify";
import { Movie } from "../../1entidades/Movie";
import mongoose, { Model } from "mongoose";
import { MovieSchema } from './MovieSchema';


@injectable()
class DBModels {
    public get movieModel(): Model<Movie> {
        const MovieModel = mongoose.model<Movie>('Movie', MovieSchema);
        return MovieModel;
    }
}

export default DBModels;