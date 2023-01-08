import {Module} from "@nestjs/common";
import {UsersService} from "../Users/users.service";
import {PostsService} from "./posts.service";
import {PostsController} from "./posts.controller";

@Module({
    providers: [UsersService, PostsService],
    controllers: [PostsController]
})
export class PostsModule { }