import {Injectable} from "@nestjs/common";
import {ResponseModel} from "../Responses/ResponseModel";
import {AddCommentDTO} from "./DTO/AddCommentDTO";
import {UsersService} from "../Users/users.service";
import {CommentsRepo} from "../Database/DatabaseRepositories";

@Injectable()
export class CommentsService{
    private readonly usersService: UsersService;

    constructor(usersService: UsersService) {
        this.usersService = usersService;
    }

    public async AddComment(addCommentDTO: AddCommentDTO): Promise<boolean | ResponseModel> {
        try{
            if(!await this.usersService.IsUserExist(addCommentDTO.login)){
                return new ResponseModel(204, "No user with this login");
            }

            if(!await this.usersService.CheckToken(addCommentDTO.login, addCommentDTO.token)){
                return new ResponseModel(400, "Wrong access token");
            }

            const comment = CommentsRepo.create({
                content: addCommentDTO.content,
                post: {
                    id: addCommentDTO.postId
                },
                author: await this.usersService.GetUserByLogin(addCommentDTO.login)
            });

            await comment.save();

            return true;
        }catch{
            return new ResponseModel(400, "Something went wrong");
        }
    }
}