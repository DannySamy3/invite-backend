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
exports.getUserId = exports.logout = exports.getUserData = exports.checkUser = exports.registerUser = void 0;
exports.getUserByEmail = getUserByEmail;
exports.validateUserPassword = validateUserPassword;
const bcrypt_1 = __importDefault(require("bcrypt"));
const nookies_1 = require("nookies");
const dt_1 = __importDefault(require("../dt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const nookies_2 = require("nookies");
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, email, phone_number, country, password, gender, } = req.body;
    if (!first_name ||
        !last_name ||
        !email ||
        !phone_number ||
        !country ||
        !password ||
        !gender) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const result = yield dt_1.default.query("INSERT INTO users (first_name, last_name, email, phone_number, country, password, gender) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [
            first_name,
            last_name,
            email,
            phone_number,
            country,
            hashedPassword,
            gender,
        ]);
        return res.status(201);
    }
    catch (error) {
        console.error("Database insertion error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.registerUser = registerUser;
function getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield dt_1.default.query("SELECT * FROM users WHERE email = $1", [
                email,
            ]);
            return result.rows[0];
        }
        catch (err) {
            console.error(err);
        }
    });
}
function validateUserPassword(user, password) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcrypt_1.default.compare(password, user.password);
    });
}
const checkUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!JWT_SECRET) {
        return res.status(500).json({ error: "JWT_SECRET is not defined" });
    }
    try {
        const user = yield getUserByEmail(email);
        if (user && (yield validateUserPassword(user, password))) {
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET, {
                expiresIn: "1h",
            });
            //   activeUser=user
            (0, nookies_2.setCookie)({ res }, "token", token, { path: "/", httpOnly: true });
            return res.status(200).json({ token });
        }
        else {
            res.status(401).send("Invalid email or password");
        }
    }
    catch (error) {
        console.error("Error logging in:", error);
        res.status(500).send("Error logging in");
    }
});
exports.checkUser = checkUser;
const getUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.user.email) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        const user = yield getUserByEmail(req.user.email);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ error: "User not found" });
        }
    }
    catch (err) {
        console.error("Error fetching user data:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getUserData = getUserData;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, nookies_1.destroyCookie)({ res }, "token");
        res.writeHead(302, { Location: "/login" });
        res.end();
    }
    catch (error) {
        console.error("Error during logout:", error);
        res.writeHead(500, { Location: "/error" });
        res.end();
    }
});
exports.logout = logout;
const getUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const { rows } = yield dt_1.default.query("SELECT * FROM users WHERE id = $1", [
            userId,
        ]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Guest not found" });
        }
        const user = rows[0];
        return res.json(user);
    }
    catch (error) {
        console.error("Error fetching guest by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getUserId = getUserId;
