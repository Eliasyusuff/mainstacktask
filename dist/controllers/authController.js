"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signUp = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const signUp = async (req, res) => {
    try {
        const user = new User_1.default(req.body);
        await user.save();
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(201).send({ user, token });
    }
    catch (error) {
        res.status(400).send(error);
    }
};
exports.signUp = signUp;
const login = async (req, res) => {
    try {
        const user = await User_1.default.findOne({ username: req.body.username });
        if (!user || !(await bcryptjs_1.default.compare(req.body.password, user.password))) {
            return res.status(401).send({ message: 'Login failed!' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.send({ user, token });
    }
    catch (error) {
        console.log("error here", error);
        console.log("req", req);
        res.status(400).send(error);
    }
};
exports.login = login;
