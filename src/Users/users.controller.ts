import {Body, Controller, HttpCode, Post, UsePipes, ValidationPipe} from "@nestjs/common";
import {UsersService} from "./users.service";
import {RegisterAccountDTO} from "./DTO/RegisterAccountDTO";
import {ResponseModel} from "../Responses/ResponseModel";
import {LoginAccountDTO} from "./DTO/LoginAccountDTO";
import {LoginResponse} from "./Response/LoginResponse";

@Controller()
export class UsersController {
    private readonly usersService: UsersService;

    constructor(usersService: UsersService) {
        this.usersService = usersService;
    }

    @HttpCode(201)
    @Post("/registerUser")
    @UsePipes(ValidationPipe)
    public async RegisterAccount(@Body() registerAccountDTO: RegisterAccountDTO): Promise<boolean | ResponseModel> {
        return await this.usersService.RegisterAccount(registerAccountDTO);
    }

    @HttpCode(200)
    @Post("/loginUser")
    @UsePipes(ValidationPipe)
    public async LoginAccount(@Body() loginAccountDTO: LoginAccountDTO): Promise<LoginResponse> {
        return await this.usersService.LoginAccount(loginAccountDTO);
    }
}