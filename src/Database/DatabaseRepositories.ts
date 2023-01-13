import {databaseConnection} from "./DatabaseConnection";
import {Comment, PostImage, User, UserPost} from "./Entities";

export const UsersRepo = databaseConnection.getRepository<User>(User);
export const PostsRepo = databaseConnection.getRepository<UserPost>(UserPost);
export const CommentsRepo = databaseConnection.getRepository<Comment>(Comment);
export const PostImagesRepo = databaseConnection.getRepository<PostImage>(PostImage);