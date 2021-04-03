"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenValidation = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token)
        return res.status(401).json("Access Denied");
    const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN_SECRET);
    console.log(payload);
    req.userId = payload._id;
    next();
};
exports.tokenValidation = tokenValidation;
//# sourceMappingURL=verifyTokens.js.map