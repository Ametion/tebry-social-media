import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {UserPost} from "./UserPost";

@Entity("comments")
export class Comment extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    content: string;

    @ManyToOne(() => User, u => u.comments, {nullable: false, onDelete: "CASCADE"})
    author: User;

    @ManyToOne(() => UserPost, post => post.comments, {nullable: false ,onDelete: "CASCADE"})
    @JoinColumn()
    post: UserPost;
}