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
    console.log(error);
  }
};

export const userController = {
  createUser,
};
