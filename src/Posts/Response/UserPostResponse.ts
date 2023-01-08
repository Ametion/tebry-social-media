import {UserResponse} from "../../Users/Response/UserResponse";
import {CommentResponse} from "../../Comments/Response/CommentResponse";

export class UserPostResponse{
    public readonly postId: number;
    public readonly postTitle: string;
    public readonly postContent: string;
    public readonly whoLikes: Array<UserResponse>;
    public readonly comments: Array<CommentResponse>;

    constructor(postId: number, postTitle: string, postContent: string, whoLikes: Array<UserResponse>, comments: Array<CommentResponse>) {
        this.postId = postId;
        this.postTitle = postTitle;
        this.postContent = postContent;
        this.whoLikes = whoLikes;
        this.comments = comments;
    }
}