import {Injectable} from "@nestjs/common";
import {PostsDTO} from "./DTO/PostsDTO";
import {ResponseModel} from "../Responses/ResponseModel";
import {UserPostResponse} from "./Response/UserPostResponse";
import {PostImagesRepo, PostsRepo} from "../Database/DatabaseRepositories";
import {UserResponse} from "../Users/Response/UserResponse";
import {UsersService} from "../Users/users.service";
import {CreatePostDTO} from "./DTO/CreatePostDTO";
import {LikePostDTO} from "./DTO/LikePostDTO";
import {UserPost} from "../Database/Entities";
import {CommentResponse} from "../Comments/Response/CommentResponse";
import {DeletePostDTO} from "./DTO/DeletePostDTO";
import {EditPostDTO} from "./DTO/EditPostDTO";
import {ImagesResponse} from "./Response/ImagesResponse";
@Injectable()
export class PostsService{
    private readonly usersService: UsersService;

    constructor(usersService: UsersService) {
        this.usersService = usersService;
    }

    public async GetUserPosts(postsDTO: PostsDTO): Promise<Array<UserPostResponse> | ResponseModel> {
        try{
            if(!await this.usersService.IsUserExist(postsDTO.login)){
                return new ResponseModel(204, "No user with this login");
            }

            if(!await this.usersService.CheckToken(postsDTO.login, postsDTO.token)){
               return new ResponseModel(400, "Wrong access token");
            }

            const arr = new Array<UserPostResponse>();

            const posts = await PostsRepo.find({
                where: {
                    author: {
                        login: postsDTO.userLogin
                    }
                },
                relations: {
                    likedBy: true,
                    comments: {
                        author: true
                    },
                    author: true,
                }
            })

            for (const p of posts) {
                const whoLiked = []
                const comments = []
                const images = []

                const postImages = await PostImagesRepo.find({
                    where: {
                        post: {
                            id: p.id
                        }
                    }
                })

                postImages.forEach(i => images.push(new ImagesResponse(i.id, i.image)));

                p.likedBy.forEach(u => whoLiked.push(new UserResponse(u.id, u.login, u.firstName, u.secondName)))
                p.comments.forEach(c => comments.push(new CommentResponse(c.id, c.content, "",
                    new UserResponse(c.author.id, c.author.login, c.author.firstName, c.author.secondName))))
                arr.push(new UserPostResponse(p.id, p.postTitle, p.postContent,
                new UserResponse(p.author.id, p.author.login, p.author.firstName, p.author.secondName), whoLiked, comments, images));
            }

            return arr;
        }catch{
            return new ResponseModel(400, "Something went wrong");
        }
    }

    public async CreatePost(createPostDTO: CreatePostDTO): Promise<boolean | ResponseModel> {
        try{
            if(!await this.usersService.IsUserExist(createPostDTO.login)){
                return new ResponseModel(204, "No user with this login");
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

            for (const i of createPostDTO.images) {
                const image = PostImagesRepo.create({
                    image: i,
                    post: post
                });

                await image.save();
            }

            return true;
        }catch{
            return new ResponseModel(400, "Something went wrong");
        }
    }

    public async LikePost(likePostDTO: LikePostDTO): Promise<boolean | ResponseModel> {
        try{
            if(!await this.usersService.IsUserExist(likePostDTO.login)){
                return new ResponseModel(204, "No user with this login");
            }

            if(!await this.usersService.CheckToken(likePostDTO.login, likePostDTO.token)){
                return new ResponseModel(400, "Wrong access token");
            }

            const user = await this.usersService.GetUserByLogin(likePostDTO.login);

            const post = await PostsRepo.findOneOrFail({
                where: {
                    id: likePostDTO.postId
                }
            })

            let liked = !!user.likedPosts.find(el => el.id == post.id);

            if (!liked) {
                user.likedPosts.push(post);
                await user.save();
                return true;
            }

            user.likedPosts = user.likedPosts.filter((v) => {
                return post.id != v.id
            })

            await user.save();

            return false;
        }catch{
            return new ResponseModel(400, "Something went wrong");
        }
    }

    public async DeletePost(deletePostDTO: DeletePostDTO): Promise<boolean | ResponseModel> {
        try{
            if(!await this.usersService.IsUserExist(deletePostDTO.login)){
                return new ResponseModel(204, "No user with this login");
            }

            if(!await this.usersService.CheckToken(deletePostDTO.login, deletePostDTO.token)){
                return new ResponseModel(400, "Wrong access token");
            }

            const post = await PostsRepo.findOneOrFail({
                where: {
                    id: deletePostDTO.postId
                }
            })

            await post.remove();

            return true;
        }catch{
            return new ResponseModel(400, "Something went wrong");
        }
    }

    public async EditPost(editPostDTO: EditPostDTO): Promise<boolean | ResponseModel> {
        try{
            if(!await this.usersService.IsUserExist(editPostDTO.login)){
                return new ResponseModel(204, "No user with this login");
            }

            if(!await this.usersService.CheckToken(editPostDTO.login, editPostDTO.token)){
                return new ResponseModel(400, "Wrong access token");
            }

            const post = await PostsRepo.findOneOrFail({
                where: {
                    id: editPostDTO.postId
                }
            })

            if(editPostDTO.newPostTitle){
                post.postTitle = editPostDTO.newPostTitle;
            }

            if(editPostDTO.newPostContent){
                post.postContent = editPostDTO.newPostContent;
            }

            await post.save();

            return true;
        }catch{
            return new ResponseModel(400, "Something went wrong");
        }
    }
}