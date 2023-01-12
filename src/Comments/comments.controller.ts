import {Body, Controller, Delete, HttpCode, Patch, Post, UsePipes, ValidationPipe} from "@nestjs/common";
import {CommentsService} from "./comments.service";
import {AddCommentDTO} from "./DTO/AddCommentDTO";
import {ResponseModel} from "../Responses/ResponseModel";
import {DeleteCommentDTO} from "./DTO/DeleteCommentDTO";
import {EditCommentDTO} from "./DTO/EditCommentDTO";

@Controller("/comment")
export class CommentsController{
    private readonly commentsService: CommentsService;

    constructor(commentsService: CommentsService) {
        this.commentsService = commentsService;
    }

    @HttpCode(201)
    @Post()
    @UsePipes(ValidationPipe)
    public async AddComment(@Body() addCommentDTO: AddCommentDTO): Promise<boolean | ResponseModel> {
        return await this.commentsService.AddComment(addCommentDTO);
    }

    @HttpCode(200)
    @Delete()
    @UsePipes(ValidationPipe)
    public async DeleteComment(@Body() deleteCommentDTO: DeleteCommentDTO): Promise<boolean | ResponseModel> {
        return await this.commentsService.DeleteComment(deleteCommentDTO);
    }

    @HttpCode(200)
    @Patch()
    @UsePipes(ValidationPipe)
    public async EditComment(@Body() editCommentDTO: EditCommentDTO): Promise<boolean | ResponseModel> {
        return await this.commentsService.EditComment(editCommentDTO);
    }
}