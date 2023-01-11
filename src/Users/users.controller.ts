import {Body, Controller, Get, HttpCode, Param, Post, UsePipes, ValidationPipe} from "@nestjs/common";
import {UsersService} from "./users.service";
import {RegisterAccountDTO} from "./DTO/RegisterAccountDTO";
import {ResponseModel} from "../Responses/ResponseModel";
import {LoginAccountDTO} from "./DTO/LoginAccountDTO";
import {LoginResponse} from "./Response/LoginResponse";
import {SetProfileImageDTO} from "./DTO/SetProfileImageDTO";
import {GetAccountInfoDTO} from "./DTO/GetAccountInfoDTO";
import {AccountResponse} from "./Response/AccountResponse";

@Controller()
export class UsersController {
    private readonly usersService: UsersService;

    constructor(usersService: UsersService) {
        this.usersService = usersService;
    }

    @HttpCode(200)
    @Get("/getAccountInfo/userLogin=:userLogin&login=:login&token=:token")
    public async GetAccountInfo(@Param() getAccountInfoDTO: GetAccountInfoDTO): Promise<AccountResponse | ResponseModel> {
        return await this.usersService.GetAccountInfo(getAccountInfoDTO);
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

    @HttpCode(200)
    @Post("/setProfileImage")
    @UsePipes(ValidationPipe)
    public async SetProfileImage(@Body() setProfileImageDTO: SetProfileImageDTO): Promise<boolean | ResponseModel> {
        return await this.usersService.SetProfileImage(setProfileImageDTO);
    }
}