declare class CustomError extends Error {
    protected statusCode: number;
    constructor(message: string, statusCode: number);
    getStatus(): number;
}
export default CustomError;
//# sourceMappingURL=CustomError.d.ts.map