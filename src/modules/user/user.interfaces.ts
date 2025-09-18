// Enums
export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPERADMIN = "SUPERADMIN",
}

export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

// User Interface
export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  role: Role;
  phone: string;
  pictures: string;
  status: Status;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  posts?: Post[];
}

// Post Interface
export interface Post {
  id: number;
  title: string;
  content: string;
  thumbnail?: string | null;
  isFeatured: boolean;
  tags: string[];
  views: number;
  authorId: number;
  author?: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface PublicUser extends Omit<User, "password"> {}

export interface UserWithPosts extends User {
  posts: Post[];
}

export interface PostWithAuthor extends Omit<Post, "author"> {
  author: PublicUser;
}

export interface CreateUserInput {
  email: string;
  name: string;
  password: string;
  phone: string;
  pictures: string;
  role?: Role;
  status?: Status;
  isVerified?: boolean;
}

export interface UpdateUserInput {
  email?: string;
  name?: string;
  password?: string;
  phone?: string;
  pictures?: string;
  role?: Role;
  status?: Status;
  isVerified?: boolean;
}

export interface CreatePostInput {
  title: string;
  content: string;
  thumbnail?: string;
  isFeatured?: boolean;
  tags: string[];
  authorId: number;
}

export interface UpdatePostInput {
  title?: string;
  content?: string;
  thumbnail?: string | null;
  isFeatured?: boolean;
  tags?: string[];
  views?: number;
}
