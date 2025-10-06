import { Schema } from 'mongoose';

export const MovieSchema:Schema = new Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    year: { type: Number, required: true },
    runtime: { type: Number, required: true },
    watched: { type: Boolean, required: true, default: false },
    rating: { type: Number, required: false }
});

