import {DataSource} from "typeorm";
import {Comment, User, UserPost} from "./Entities";

require("dotenv").config()

export const databaseConnection = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: process.env.DATABASENAME?.toString() || "",
    entities: [User, Comment, UserPost],
    synchronize: true
})