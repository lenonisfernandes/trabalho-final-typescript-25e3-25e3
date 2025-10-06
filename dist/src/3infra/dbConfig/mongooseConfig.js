"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
class MongooseConfig {
    static async connect() {
        try {
            const CHAVEMONGO = `${process.env.MONGO_DB_KEY}${process.env.DATABASE}?${process.env.DB_OPTIONS}`;
            if (!CHAVEMONGO)
                throw new Error("Chave de BD não encontrada.");
            const connectionOptions = { connectTimeoutMS: 5000 };
            await mongoose_1.default.connect(CHAVEMONGO, connectionOptions);
            console.log("Conectado ao MongoDB com sucesso.");
        }
        catch (error) {
            console.error("Erro ao conectar ao MongoDB:", error);
            process.exit(1);
        }
    }
}
exports.default = MongooseConfig;
//# sourceMappingURL=mongooseConfig.js.map