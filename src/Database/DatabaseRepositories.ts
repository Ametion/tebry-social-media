import {databaseConnection} from "./DatabaseConnection";
import {Comment, User, UserPost} from "./Entities";

export const UsersRepo = databaseConnection.getRepository<User>(User);
export const PostsRepo = databaseConnection.getRepository<UserPost>(UserPost);
export const CommentsRepo = databaseConnection.getRepository<Comment>(Comment);