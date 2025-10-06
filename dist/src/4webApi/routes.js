"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MovieController_1 = __importDefault(require("./controllers/MovieController"));
const express_1 = require("express");
const InversifyConfig_1 = __importDefault(require("./config/InversifyConfig"));
const routes = (0, express_1.Router)();
const movieController = InversifyConfig_1.default.get(MovieController_1.default);
routes.use('/movies', movieController.router);
exports.default = routes;
//# sourceMappingURL=routes.js.map