import type { Prisma, User } from "@prisma/client";
import { prisma } from "../../config/db";

const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
  const createdUser = await prisma.user.create({ data: payload });
  return createdUser;
};

const getAllUsers = async () => {
  const allUsers = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      phone: true,
      pictures: true,
      role: true,
      status: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
      posts: {
        select: { id: true, title: true, thumbnail: true, createdAt: true },
      },
    },
  });
  return allUsers;
};

const getUserById = async (id: number) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id },
  });
  return user;
};

export const userServices = {
  createUser,
  getAllUsers,
  getUserById,
};
