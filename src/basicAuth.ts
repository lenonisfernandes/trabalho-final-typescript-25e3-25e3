import { Request, Response, NextFunction } from "express";
import CustomError from "./api/exceptions/CustomError";

const USUARIO = "admin";
const SENHA = "senhaSuperSecreta";

export const basicAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        throw new CustomError('Credenciais não fornecidas', 401);
    }

    if(!authHeader.startsWith('Basic ')) {
        throw new CustomError('Tipo de autenticação não suportado', 401);
    }

    try {
        const base64Credentials = authHeader.split(" ")[1];

        if(!base64Credentials) {
            throw new CustomError('Credenciais não fornecidas', 401);
        }
        const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
        const [username, password] = credentials.split(":");

        if (username === USUARIO && password === SENHA) {
            (req as Request & { user: { username: string } }).user = { username };
            next();
        } else {
            throw new CustomError('Credenciais inválidas', 401);
        }
    } catch (error) {
        throw new CustomError('Credenciais inválidas', 401);
    }
}