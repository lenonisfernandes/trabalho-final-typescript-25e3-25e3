"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicAuthMiddleware = void 0;
const CustomError_1 = __importDefault(require("../../2domain/exceptions/CustomError"));
const USUARIO = "admin";
const SENHA = "senhaSuperSecreta";
const basicAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new CustomError_1.default('Credenciais não fornecidas', 401);
    }
    if (!authHeader.startsWith('Basic ')) {
        throw new CustomError_1.default('Tipo de autenticação não suportado', 401);
    }
    try {
        const base64Credentials = authHeader.split(" ")[1];
        if (!base64Credentials) {
            throw new CustomError_1.default('Credenciais não fornecidas', 401);
        }
        const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
        const [username, password] = credentials.split(":");
        if (username === USUARIO && password === SENHA) {
            req.user = { username };
            next();
        }
        else {
            throw new CustomError_1.default('Credenciais inválidas', 401);
        }
    }
    catch (error) {
        throw new CustomError_1.default('Credenciais inválidas', 401);
    }
};
exports.basicAuthMiddleware = basicAuthMiddleware;
//# sourceMappingURL=basicAuth.js.map