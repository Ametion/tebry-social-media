import {Body, Controller, HttpCode, Post, UsePipes, ValidationPipe} from "@nestjs/common";
import {CommentsService} from "./comments.service";
import {AddCommentDTO} from "./DTO/AddCommentDTO";
import {ResponseModel} from "../Responses/ResponseModel";

@Controller()
export class CommentsController{
    private readonly commentsService: CommentsService;

    constructor(commentsService: CommentsService) {
        this.commentsService = commentsService;
    }

    @HttpCode(201)
    @Post("/commentPost")
    @UsePipes(ValidationPipe)
    public async AddComment(@Body() addCommentDTO: AddCommentDTO): Promise<boolean | ResponseModel> {
        return await this.commentsService.AddComment(addCommentDTO);
    }
}