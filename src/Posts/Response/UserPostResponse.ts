import {UserResponse} from "../../Users/Response/UserResponse";
import {CommentResponse} from "../../Comments/Response/CommentResponse";
import {ImagesResponse} from "./ImagesResponse";

export class UserPostResponse{
    public readonly postId: number;
    public readonly postTitle: string;
    public readonly postContent: string;
    public readonly postAuthor: UserResponse;
    public readonly whoLikes: Array<UserResponse>;
    public readonly comments: Array<CommentResponse>;
    public readonly images: Array<ImagesResponse>;


    constructor(postId: number, postTitle: string, postContent: string, postAuthor: UserResponse, whoLikes: Array<UserResponse>, comments: Array<CommentResponse>, images: Array<ImagesResponse>) {
        this.postId = postId;
        this.postTitle = postTitle;
        this.postContent = postContent;
        this.postAuthor = postAuthor;
        this.whoLikes = whoLikes;
        this.comments = comments;
        this.images = images;
    }
}