import type { Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const createPost = async (payload: Prisma.PostCreateInput) => {
  const userCreate = await prisma.post.create({
    data: payload,
  });
  return userCreate;
};

export const postServices = {
  createPost,
};
