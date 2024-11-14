"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = expressApp;
const express_1 = __importDefault(require("express"));
const env_1 = __importDefault(require("utils/env"));
function expressApp() {
    const app = (0, express_1.default)();
    app.use();
    env_1.default;
    return app;
}
