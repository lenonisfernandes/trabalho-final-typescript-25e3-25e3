"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieSchema = void 0;
const mongoose_1 = require("mongoose");
exports.MovieSchema = new mongoose_1.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    year: { type: Number, required: true },
    runtime: { type: Number, required: true },
    watched: { type: Boolean, required: true, default: false },
    rating: { type: Number, required: false }
});
//# sourceMappingURL=MovieSchema.js.map