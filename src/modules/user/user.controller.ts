import type { Request, Response } from "express";
import { userServices } from "./user.services";

const createUser = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const result = await userServices.createUser(body);
    res.status(200).json({
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: "User not created",
      data: error instanceof Error ? error.message : error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsers();
    res.status(201).json({
      message: "User retrived successfully",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      message: "Users not found",
      data: error instanceof Error ? error.message : error,
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await userServices.getUserById(id);
    res.status(201).json({
      message: "User retrived successfully",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      message: "User not found",
      data: error instanceof Error ? error.message : error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await userServices.deleteUser(id);
    res.status(201).json({
      message: "User deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      message: "User delete failed",
      data: error instanceof Error ? error.message : error,
    });
  }
};

const editUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const payload = req.body;
    const result = await userServices.editUser(id, payload);
    res.status(201).json({
      message: "User updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      message: "User update failed",
      data: error instanceof Error ? error.message : error,
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  editUser,
};
