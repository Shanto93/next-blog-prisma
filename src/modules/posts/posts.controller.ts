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

const getAPost = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const post = await postServices.getAPost(id);
    res.status(201).json({
      message: "Post retrieved successfully",
      data: post,
    });
  } catch (error) {
    res.status(404).json({
      message: "Post Retrieve Failed",
      data: error instanceof Error ? error.message : error,
    });
  }
};
const getAllPosts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const searchItem = (req.query.searchItem as string) || "";
    const getAllPosts = await postServices.getAllPosts(page, limit, searchItem);
    res.status(201).json({
      message: "Posts retrieved successfully",
      data: getAllPosts,
    });
  } catch (error) {
    res.status(404).json({
      message: "Posts Retrieve Failed",
      data: error instanceof Error ? error.message : error,
    });
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const deletedPost = await postServices.deletePost(id);
    res.status(201).json({
      message: "Posts Deleted successfully",
      data: deletedPost,
    });
  } catch (error) {
    res.status(404).json({
      message: "Posts Delition Failed",
      data: error instanceof Error ? error.message : error,
    });
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const payload = req.body;
    const updatedPost = await postServices.updatePost(id, payload);
    res.status(201).json({
      message: "Post Updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    res.status(404).json({
      message: "Posts Update Failed",
      data: error instanceof Error ? error.message : error,
    });
  }
};

export const postsController = {
  createPosts,
  getAllPosts,
  getAPost,
  deletePost,
  updatePost,
};
