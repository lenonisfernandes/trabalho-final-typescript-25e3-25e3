import { ObjectId } from 'bson';


export type MovieSchemaDriver = {
    id: number;
    title: string;
    year: number;
    runtime: number;
    watched: boolean;
    _id?: ObjectId;
    rating?: number;
};
