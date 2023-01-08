import {databaseConnection} from "./DatabaseConnection";
import {User} from "./Entities";

export const UsersRepo = databaseConnection.getRepository<User>(User);