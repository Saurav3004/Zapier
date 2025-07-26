"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const middleware_1 = require("../middleware");
const route = (0, express_1.Router)();
route.post("/signup", (req, res) => {
    console.log("signup created");
});
route.post("/signin", (req, res) => {
    console.log("signin created");
});
route.get("/user", middleware_1.authMiddleware, (req, res) => {
    console.log("signin handler");
});
exports.userRouter = route;
