import {IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min, MinLength} from "class-validator";

export class EditPostDTO{
    @IsNumber()
    @Max(9999, {message: "post id is too big"})
    @Min(1, {message: "post id is too small"})
    public postId: number;

    public newPostTitle: string;

    public newPostContent: string;

    @IsString({message: "is must to be a string"})
    @IsNotEmpty({message: "string cant be empty"})
    @MaxLength(75, {message: "that value its too long to be a login"})
    @MinLength(1, {message: "that value its too short to be a login"})
    public login: string;

    @IsString({message: "is must to be a string"})
    @IsNotEmpty({message: "string cant be empty"})
    @MaxLength(75, {message: "that value its too long to be a token"})
    @MinLength(1, {message: "that value its too short to be a token"})
    public token: string;
}