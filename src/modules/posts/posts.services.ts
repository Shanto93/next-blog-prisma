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

const getAPost = async (id: number) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  return post;
};

const getAllPosts = async (page: number, limit: number, searchItem: string) => {
  const skip = (page - 1) * limit;
  const allPosts = await prisma.post.findMany({
    skip,
    take: limit,
    where: {
      OR: [
        {
          title: {
            contains: searchItem,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: searchItem,
            mode: "insensitive",
          },
        },
      ],
    },
  });
  return allPosts;
};

const deletePost = async (id: number) => {
  const deletedPost = await prisma.post.delete({
    where: {
      id,
    },
  });
  return deletePost;
};

const updatePost = async (id: number, payload: Prisma.PostUpdateInput) => {
  const updatedPost = await prisma.post.update({
    where: {
      id,
    },
    data: payload,
  });
  return updatedPost;
};

export const postServices = {
  createPost,
  getAPost,
  getAllPosts,
  deletePost,
  updatePost,
};
