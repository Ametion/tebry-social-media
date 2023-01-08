import {Injectable} from "@nestjs/common";
import {RegisterAccountDTO} from "./DTO/RegisterAccountDTO";
import {ResponseModel} from "../Responses/ResponseModel";
import {UsersRepo} from "../Database/DatabaseRepositories";
import {LoginAccountDTO} from "./DTO/LoginAccountDTO";
import {LoginResponse} from "./Response/LoginResponse";
import {v4 as uuid} from 'uuid';

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
}