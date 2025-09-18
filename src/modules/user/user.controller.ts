import type { Request, Response } from "express";
import { userServices } from "./user.services";

const createUser = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const result = await userServices.createUser(body);
    res.status(200).json({
      status: "User created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "User not created",
      message: error instanceof Error ? error.message : error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsers();
    res.status(201).json({
      status: "User retrived successfully",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      status: "Users not found",
      message: error instanceof Error ? error.message : error,
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await userServices.getUserById(id);
    res.status(201).json({
      status: "User retrived successfully",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      status: "User not found",
      message: error instanceof Error ? error.message : error,
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getUserById,
};
