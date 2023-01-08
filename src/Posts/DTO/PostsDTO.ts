import {IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class PostsDTO {
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