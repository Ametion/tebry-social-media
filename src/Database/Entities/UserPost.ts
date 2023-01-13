import {
    BaseEntity,
    Column, CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import {User} from "./User";
import {Comment} from "./Comment";
import {PostImage} from "./PostImage";

@Entity("userPosts")
export class UserPost extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    postTitle: string;

    @Column({
        nullable: false
    })
    postContent: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn()
    author: User;

    @ManyToMany(() => User, user => user.likedPosts)
    @JoinTable()
    likedBy: User[];

    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[];

    @OneToMany(() => PostImage, i => i.post)
    images: PostImage[];
}