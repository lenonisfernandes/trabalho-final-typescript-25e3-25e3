"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    static implementacao(req, res, next) {
        console.log(`Chamada ao método: ${req.method} url: ${req.url} - ${new Date().toISOString()}`);
        next();
    }
    static init() {
        return this.implementacao;
    }
}
exports.default = Logger;
//# sourceMappingURL=Logger.js.map