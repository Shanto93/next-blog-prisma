import type { Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const createPost = async (payload: Prisma.PostCreateInput) => {
  const userCreate = await prisma.post.create({
    data: payload,
    include: {
      author: true,
    },
  });
  return userCreate;
};

const getAllPosts = async () => {
  const allPosts = await prisma.post.findMany();
  return allPosts;
};

export const postServices = {
  createPost,
  getAllPosts,
};
