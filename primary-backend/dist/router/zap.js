"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zapRouter = void 0;
const express_1 = require("express");
const middleware_1 = require("../middleware");
const route = (0, express_1.Router)();
route.post("/", middleware_1.authMiddleware, (req, res) => {
    console.log("create a zap");
});
route.get("/", middleware_1.authMiddleware, (req, res) => {
    console.log("signin created");
});
route.get("/:zapId", middleware_1.authMiddleware, (req, res) => {
    console.log("specific zap");
});
exports.zapRouter = route;
