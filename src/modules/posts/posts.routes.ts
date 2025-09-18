import express from "express";
import { postsController } from "./posts.controller";

const router = express.Router();

router.get("/", postsController.getAllPosts);
router.post("/create-post", postsController.createPosts);

export const postRoutes = router;
