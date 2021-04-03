"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.signIn = exports.signUp = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = new User_1.default({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
    });
    user.password = yield user.encryptPassword(user.password);
    const savedUser = yield user.save();
    const token = jsonwebtoken_1.default.sign({ _id: savedUser._id }, (_a = process.env.JWT_TOKEN_SECRET) !== null && _a !== void 0 ? _a : "testsecret");
    res.header("auth-token", token).json(savedUser);
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const user = yield User_1.default.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).json({ error: "Email / Password invalid" });
    const validPassword = yield bcryptjs_1.default.compare(req.body.password, user.password);
    if (!validPassword)
        return res.status(400).json({ error: "Invalid Password" });
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, (_b = process.env.JWT_TOKEN_SECRET) !== null && _b !== void 0 ? _b : "testsecret", { expiresIn: 60 * 60 * 24 });
    res.header("auth-token", token).json(user);
});
exports.signIn = signIn;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.userId, { password: 0 });
    if (!user)
        return res.status(404).json("No User Found");
    res.json(user);
});
exports.profile = profile;
//# sourceMappingURL=auth.controller.js.map