"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const MovieService_1 = __importDefault(require("../../2domain/services/MovieService"));
const MovieController_1 = __importDefault(require("../controllers/MovieController"));
const MovieRepositoryMongoose_1 = __importDefault(require("../../3infra/repositorios/MovieRepositoryMongoose"));
const container = new inversify_1.Container();
container.bind("MovieRepositoryAsyncInterface").to(MovieRepositoryMongoose_1.default).inRequestScope();
container.bind("MovieService").to(MovieService_1.default).inRequestScope();
container.bind("MovieController").to(MovieController_1.default).inRequestScope();
exports.default = container;
//# sourceMappingURL=InversifyConfig.js.map