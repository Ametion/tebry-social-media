import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserPost} from "./UserPost";

@Entity("postImages")
export class PostImage extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;


    @Column({
        nullable: false,
        type: "longtext"
    })
    image: string;

    @ManyToOne(() => UserPost, p => p.images)
    post: UserPost;
}