import {Injectable} from "@nestjs/common";
import {PostsDTO} from "./DTO/PostsDTO";
import {ResponseModel} from "../Responses/ResponseModel";
import {UserPostResponse} from "./Response/UserPostResponse";
import {PostsRepo} from "../Database/DatabaseRepositories";
import {UserResponse} from "../Users/Response/UserResponse";
import {UsersService} from "../Users/users.service";
import {CreatePostDTO} from "./DTO/CreatePostDTO";
import {LikePostDTO} from "./DTO/LikePostDTO";
@Injectable()
export class PostsService{
    private readonly usersService: UsersService;

    constructor(usersService: UsersService) {
        this.usersService = usersService;
    }

    public async GetUserPosts(postsDTO: PostsDTO): Promise<Array<UserPostResponse> | ResponseModel> {
        try{
            const arr = new Array<UserPostResponse>();

            if(!await this.usersService.CheckToken(postsDTO.login, postsDTO.token)){
               return new ResponseModel(400, "Wrong access token");
            }

            const posts = await PostsRepo.find({
                where: {
                    author: {
                        login: postsDTO.login
                    }
                },
                relations: {
                    likedBy: true,
                    comments: {
                        author: true
                    }
                }
            })

            posts.forEach(p => {
                const whoLiked = []
                const comments = []

                p.likedBy.forEach(u => whoLiked.push(new UserResponse(u.id, u.login, u.firstName, u.secondName)));
                arr.push(new UserPostResponse(p.id, p.postTitle, p.postContent, whoLiked, comments));
            });

            return arr;
        }catch{
            return new ResponseModel(400, "something went wrong");
        }
    }

    public async CreatePost(createPostDTO: CreatePostDTO): Promise<boolean | ResponseModel> {
        try{
            if(!await this.usersService.IsUserExist(createPostDTO.login)){
                return false
            }

            if(!await this.usersService.CheckToken(createPostDTO.login, createPostDTO.token)){
                return new ResponseModel(400, "Wrong access token");
            }

            const post = PostsRepo.create({
                postTitle: createPostDTO.postTitle,
                postContent: createPostDTO.postContent,
                author: await this.usersService.GetUserByLogin(createPostDTO.login)
            })

            await post.save()

            return true;
        }catch{
            return new ResponseModel(400, "Something went wrong");
        }
    }

    public async LikePost(likePostDTO: LikePostDTO): Promise<boolean | ResponseModel> {
        try{
            const user = await this.usersService.GetUserByLogin(likePostDTO.login);

            const post = await PostsRepo.findOneOrFail({
                where: {
                    id: likePostDTO.postId
                }
            })

            let liked = !!user.likedPosts.find(element => element.id == post.id);

            if (liked) {
                user.likedPosts = user.likedPosts.filter((v) => {
                    return post.id != v.id
                })
                await user.save();
                return false;
            }

            user.likedPosts.push(post);
            await user.save();
            return true;
    }catch(e: any){
        return new ResponseModel(400, e.toString());
    }
}
}