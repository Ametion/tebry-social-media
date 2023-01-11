import {Injectable} from "@nestjs/common";
import {RegisterAccountDTO} from "./DTO/RegisterAccountDTO";
import {ResponseModel} from "../Responses/ResponseModel";
import {UsersRepo} from "../Database/DatabaseRepositories";
import {LoginAccountDTO} from "./DTO/LoginAccountDTO";
import {LoginResponse} from "./Response/LoginResponse";
import {v4 as uuid} from 'uuid';
import {User} from "../Database/Entities";
import {SetProfileImageDTO} from "./DTO/SetProfileImageDTO";
import {GetAccountInfoDTO} from "./DTO/GetAccountInfoDTO";
import {AccountResponse} from "./Response/AccountResponse";

@Injectable()
export class UsersService {
    public async RegisterAccount(registerAccountDTO: RegisterAccountDTO): Promise<boolean | ResponseModel> {
        try{
            const user = UsersRepo.create({
                firstName: registerAccountDTO.firstName,
                secondName: registerAccountDTO.secondName,
                login: registerAccountDTO.login,
                password: registerAccountDTO.password
            })

            await user.save();

            return true;
        }catch{
            return new ResponseModel(400, "This user already exist");
        }
    }

    public async LoginAccount(loginAccountDTO: LoginAccountDTO): Promise<LoginResponse> {
        try{
            const user = await UsersRepo.findOneOrFail({
                where: {
                    login: loginAccountDTO.login
                }
            });

            if(user.password != loginAccountDTO.password){
                return new LoginResponse(false, "");
            }

            const token = uuid();

            user.accessToken = token;

            await user.save();

            return new LoginResponse(true, token);
        }catch(e: any){
            return new LoginResponse(false, "");
        }
    }

    public async SetProfileImage(setProfileImageDTO: SetProfileImageDTO): Promise<boolean | ResponseModel> {
        try{
            if(!await this.IsUserExist(setProfileImageDTO.login)){
                return new ResponseModel(204, "No user with this login");
            }

            if(!await this.CheckToken(setProfileImageDTO.login, setProfileImageDTO.token)){
                return new ResponseModel(400, "Wrong access token");
            }

            const user = await UsersRepo.findOneOrFail({
                where: {
                    login: setProfileImageDTO.login
                }
            })

            user.profileImage = setProfileImageDTO.image;

            await user.save();

            return true;
        }catch{
            return new ResponseModel(400, "Something went wrong");
        }
    }

    public async GetAccountInfo(getAccountInfoDTO: GetAccountInfoDTO): Promise<AccountResponse | ResponseModel> {
        try{
            if(!await this.IsUserExist(getAccountInfoDTO.login)){
                return new ResponseModel(204, "No user with this login");
            }

            if(!await this.CheckToken(getAccountInfoDTO.login, getAccountInfoDTO.token)){
                return new ResponseModel(400, "Wrong access token");
            }

            const user = await UsersRepo.findOneOrFail({
                where: {
                    login: getAccountInfoDTO.userLogin
                }
            })

            return new AccountResponse(user.id, user.login, user.firstName, user.secondName, user.profileDescription, user.profileImage);
        }catch{
            return new ResponseModel(400, "Something went wrong");
        }
    }

    public async CheckToken(login: string, token: string){
        try{
            const user = await UsersRepo.findOneOrFail({
                where: {
                    login: login
                }
            })

            return user.accessToken == token;
        }catch{
            return false;
        }
    }

    public async IsUserExist(login: string): Promise<boolean> {
        try{
            await UsersRepo.findOneOrFail({
                where: {
                    login: login
                }
            })

            return true;
        }catch{
            return false;
        }
    }

    public async GetUserByLogin(login: string): Promise<User | never>{
        try{
            return await UsersRepo.findOneOrFail({
                where: {
                    login: login
                },
                relations: {
                    comments: {
                        author: true
                    },
                    followers: true,
                    followings: true,
                    likedPosts: true
                }
            })
        }catch(e: any){
            throw new Error(e);
        }
    }
}