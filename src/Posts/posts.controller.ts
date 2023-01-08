import {Body, Controller, Get, HttpCode, Param, Post, Query, UsePipes, ValidationPipe} from "@nestjs/common";
import {PostsService} from "./posts.service";
import {PostsDTO} from "./DTO/PostsDTO";
import {UserPostResponse} from "./Response/UserPostResponse";
import {ResponseModel} from "../Responses/ResponseModel";
import {CreatePostDTO} from "./DTO/CreatePostDTO";

@Controller()
export class PostsController {
    private readonly postsService: PostsService;

    constructor(postsService: PostsService) {
        this.postsService = postsService;
    }

    @HttpCode(200)
    @Get("/userPosts/login=:login&token=:token")
    public async GetUserPosts(@Param() postsDTO: PostsDTO): Promise<Array<UserPostResponse> | ResponseModel>{
        return await this.postsService.GetUserPosts(postsDTO);
    }

    @HttpCode(201)
    @Post("/post")
    @UsePipes(ValidationPipe)
    public async CreatePost(@Body() createPostDTO: CreatePostDTO): Promise<boolean | ResponseModel> {
        return await this.postsService.CreatePost(createPostDTO);
    }
}