import {Module} from "@nestjs/common";
import {UsersService} from "../Users/users.service";
import {CommentsController} from "./comments.controller";
import {CommentsService} from "./comments.service";

@Module({
    providers: [UsersService, CommentsService],
    controllers: [CommentsController]
})
export class CommentsModule { }