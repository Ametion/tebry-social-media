import {IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class RegisterAccountDTO {
    @IsString({message: "This parameter must to be a string type"})
    @IsNotEmpty({message: "This parameter must to have value"})
    @MinLength(1, {message: "First Name must to be real"})
    @MaxLength(50, {message: "First Name must to be real"})
    public firstName: string;

    @IsString({message: "This parameter must to be a string type"})
    @IsNotEmpty({message: "This parameter must to have value"})
    @MinLength(1, {message: "Second Name must to be real"})
    @MaxLength(50, {message: "Second Name must to be real"})
    public secondName: string;

    @IsString({message: "This parameter must to be a string type"})
    @IsNotEmpty({message: "This parameter must to have value"})
    @MinLength(4, {message: "Login must to have minimum 5 symbols"})
    @MaxLength(30, {message: "Login must to have maximum 30 symbols"})
    public login: string;

    @IsString({message: "This parameter must to be a string type"})
    @IsNotEmpty({message: "This parameter must to have value"})
    @MinLength(5, {message: "Password must to have minimum 5 symbols"})
    @MaxLength(30, {message: "Password must to have maximum 30 symbols"})
    public password: string;
}