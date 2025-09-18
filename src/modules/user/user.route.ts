import express from "express";
import { userController } from "./user.controller";
const route = express.Router();

route.post("/create-user", userController.createUser);
route.get("/", userController.getAllUsers);
route.get("/:id", userController.getUserById);

export const userRoutes = route;
