import express from "express";
import { postsController } from "./posts.controller";

const router = express.Router();

router.get("/", postsController.getAllPosts);
router.get("/:id", postsController.getAPost);
router.post("/create-post", postsController.createPosts);
router.delete("/:id", postsController.deletePost);
router.patch("/:id", postsController.updatePost);

export const postRoutes = router;
