import {UserResponse} from "../../Users/Response/UserResponse";

export class CommentResponse{
    public readonly commentId: number;
    public readonly commentContent: string;
    public readonly commentDate: string;
    public readonly commentAuthor: UserResponse;

    constructor(commentId: number, commentContent: string, commentDate: string, commentAuthor: UserResponse) {
        this.commentId = commentId;
        this.commentContent = commentContent;
        this.commentDate = commentDate;
        this.commentAuthor = commentAuthor;
    }
}