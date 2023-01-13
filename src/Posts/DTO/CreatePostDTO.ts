import {ArrayMaxSize, IsArray, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class CreatePostDTO {

    @IsString({message: "is must to be a string"})
    @IsNotEmpty({message: "string cant be empty"})
    @MaxLength(75, {message: "that value its too long to be a login"})
    @MinLength(1, {message: "that value its too short to be a login"})
    public postTitle: string;

    @IsString({message: "is must to be a string"})
    @IsNotEmpty({message: "string cant be empty"})
    @MaxLength(75, {message: "that value its too long to be a token"})
    @MinLength(1, {message: "that value its too short to be a token"})
    public postContent: string;

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

    @IsArray({message: "its must to be array"})
    @ArrayMaxSize(5, {message: "too many images"})
    public images: string[];
}