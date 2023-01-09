import { Module } from '@nestjs/common';
import {UsersModule} from "./Users/users.module";
import {PostsModule} from "./Posts/posts.module";
import {CommentsModule} from "./Comments/comments.module";
@Module({
  imports: [UsersModule, PostsModule, CommentsModule]
})
export class AppModule { }
