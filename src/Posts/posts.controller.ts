import {Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UsePipes, ValidationPipe} from "@nestjs/common";
import {PostsService} from "./posts.service";
import {PostsDTO} from "./DTO/PostsDTO";
import {UserPostResponse} from "./Response/UserPostResponse";
import {ResponseModel} from "../Responses/ResponseModel";
import {CreatePostDTO} from "./DTO/CreatePostDTO";
import {LikePostDTO} from "./DTO/LikePostDTO";
import {DeletePostDTO} from "./DTO/DeletePostDTO";
import {EditPostDTO} from "./DTO/EditPostDTO";

@Controller("/post")
export class PostsController {
    private readonly postsService: PostsService;

    constructor(postsService: PostsService) {
        this.postsService = postsService;
    }

    @HttpCode(200)
    @Get("/userLogin=:userLogin&login=:login&token=:token")
    public async GetUserPosts(@Param() postsDTO: PostsDTO): Promise<Array<UserPostResponse> | ResponseModel>{
        return await this.postsService.GetUserPosts(postsDTO);
    }

    @HttpCode(201)
    @Post()
    @UsePipes(ValidationPipe)
    public async CreatePost(@Body() createPostDTO: CreatePostDTO): Promise<boolean | ResponseModel> {
        return await this.postsService.CreatePost(createPostDTO);
    }

    @HttpCode(200)
    @Post("/like")
    @UsePipes(ValidationPipe)
    public async LikePost(@Body() likePostDTO: LikePostDTO): Promise<boolean | ResponseModel> {
        return await this.postsService.LikePost(likePostDTO);
    }

    @HttpCode(200)
    @Delete()
    @UsePipes(ValidationPipe)
    public async DeletePost(@Body() deletePostDTO: DeletePostDTO): Promise<boolean | ResponseModel> {
        return await this.postsService.DeletePost(deletePostDTO);
    }

    @HttpCode(201)
    @Patch()
    @UsePipes(ValidationPipe)
    public async EditPost(@Body() editPostDTO: EditPostDTO): Promise<boolean | ResponseModel> {
        return await this.postsService.EditPost(editPostDTO);
    }
}