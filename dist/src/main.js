"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./4webApi/routes"));
const Logger_1 = __importDefault(require("./3infra/repositorios/Logger"));
const basicAuth_1 = require("./3infra/middlewares/basicAuth");
const CustomError_1 = __importDefault(require("./2domain/exceptions/CustomError"));
const mongooseConfig_1 = __importDefault(require("./3infra/dbConfig/mongooseConfig"));
const dotenv_1 = __importDefault(require("dotenv"));
function errorHandler(error, req, res, next) {
    if (error instanceof CustomError_1.default) {
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
dotenv_1.default.config();
mongooseConfig_1.default.connect();
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use(Logger_1.default.init());
app.use(basicAuth_1.basicAuthMiddleware);
app.use('/api', routes_1.default);
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=main.js.map