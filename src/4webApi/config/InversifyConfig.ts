import { Container } from "inversify";
import MovieService from "../../2domain/services/MovieService";
import MovieController from "../controllers/MovieController";
import MovieRepositoryMongoose from "../../3infra/repositorios/MovieRepositoryMongoose";
import MovieRepositoryAsyncInterface from "../../2domain/interfaces/MovieRepositoryAsyncInterface";
import MovieServiceInterface from "../../2domain/interfaces/MovieServiceInterface";
import DBModels from "../../3infra/repositorios/DBModels";

const container = new Container();

container.bind<DBModels>('DBModels').to(DBModels).inRequestScope();
container.bind<MovieRepositoryAsyncInterface>("MovieRepositoryMongoose").to(MovieRepositoryMongoose).inRequestScope();
container.bind<MovieServiceInterface>("MovieService").to(MovieService).inRequestScope();
container.bind<MovieController>("MovieController").to(MovieController).inRequestScope();

export default container;
