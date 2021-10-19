"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
//const router = express.Router()
var app = (0, express_1.default)();
app.use(express_1.default.json());
var routes = require('./router');
app.use('/router', routes);
app.listen(5000, function () {
    console.log('server started');
});
app.use("/operation", routes);
