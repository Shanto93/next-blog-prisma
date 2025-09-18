import { Request, Response } from "express";
import { postServices } from "./posts.services";

const createPosts = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const userCreate = await postServices.createPost(payload);
    res.status(201).json({
      message: "Post created successfully",
      data: userCreate,
    });
  } catch (error) {
    res.status(404).json({
      message: "User Creation Failed",
      data: error instanceof Error ? error.message : error,
    });
  }
};

export const postsController = {
  createPosts,
};
