import {BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UserPost} from "./UserPost";
import {Comment} from "./Comment";

@Entity("users")
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    firstName: string;

    @Column({
        nullable: false
    })
    secondName: string;

    @Column({
        nullable: true
    })
    profileDescription: string;

    @Column({
        nullable: false,
        unique: true
    })
    login: string;

    @Column({
        nullable: false
    })
    password: string;

    @Column({
        nullable: true,
        type: "longtext"
    })
    profileImage: string;

    @Column({
        nullable: true
    })
    accessToken: string;

    @ManyToMany(() => User, user => user.followings, {nullable: false})
    @JoinTable()
    followers: User[];

    @ManyToMany(() => User, user => user.followers, {nullable: false})
    followings: User[];

    @ManyToMany(() => UserPost, p => p.likedBy)
    likedPosts: UserPost[];

    @OneToMany(() => Comment, c => c.author)
    comments: Comment[];

    @OneToMany(() => UserPost, p => p.author)
    posts: UserPost[];
}