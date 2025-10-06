import express, { Request, Response, NextFunction } from 'express';
import routes from "./4webApi/routes";
import Logger from './3infra/repositorios/Logger';
import { basicAuthMiddleware } from './3infra/middlewares/basicAuth';
import CustomError from './2domain/exceptions/CustomError';
import MongooseConfig from './3infra/dbConfig/mongooseConfig';
import dotenv from 'dotenv';

function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    if (error instanceof CustomError) {
        res.status(error.getStatus()).json(error.message); 
    }
    console.log(error.message);

    const message = 'Erro interno do servidor';
    const status = 500;
    res.status(status).json({
        error: message,
        status: status
    });
}

dotenv.config();

MongooseConfig.connect();

const app = express();
const port = 3000;

app.use(express.json());
app.use(Logger.init())
app.use(basicAuthMiddleware);
app.use('/api', routes);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
