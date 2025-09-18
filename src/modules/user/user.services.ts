import type { Prisma, User } from "@prisma/client";
import { prisma } from "../../config/db";

const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
  const createdUser = await prisma.user.create({ data: payload });
  return createdUser;
};

export const userServices = {
  createUser,
};
