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
exports.profile = exports.signin = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new User_1.default({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    user.password = yield user.encryptmethod(user.password);
    const saveduser = yield user.save();
    const token = jsonwebtoken_1.default.sign({
        _id: saveduser._id.toString()
    }, process.env.TOKEN_SECRET || 'tokenttest', { expiresIn: 60 * 60 * 24 });
    // res.header("auth-token", token).json(saveduser)
    res.status(200).json({
        message: "success",
        token: token
    });
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).json({
            message: 'not found'
        });
    }
    const correct = yield user.validatepassword(req.body.password);
    if (!correct) {
        return res.status(400).json({
            message: 'pass not correct'
        });
    }
    const token = yield jsonwebtoken_1.default.sign({
        _id: user._id.toString()
    }, process.env.TOKEN_SECRET || 'tokenttest', {
        expiresIn: 60 * 60 * 24
    });
    res.header("auth-token", token).json(user);
    // res.status(200).json({
    //     message: 'logged in success',
    //     user: user,
    //     token: token
    // })
});
exports.signin = signin;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne(req.userId, { password: 0 }); //means not view
    if (!user) {
        return res.status(404).json({
            message: 'not found'
        });
    }
    res.status(200).json({
        message: 'user here',
        user: user
    });
});
exports.profile = profile;
//# sourceMappingURL=auth.controllers.js.map