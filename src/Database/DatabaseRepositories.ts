import {databaseConnection} from "./DatabaseConnection";
import {User, UserPost} from "./Entities";

export const UsersRepo = databaseConnection.getRepository<User>(User);
export const PostsRepo = databaseConnection.getRepository<UserPost>(UserPost);