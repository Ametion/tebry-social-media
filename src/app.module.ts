import { Module } from '@nestjs/common';
import {UsersModule} from "./Users/users.module";
import {PostsModule} from "./Posts/posts.module";
@Module({
  imports: [UsersModule, PostsModule]
})
export class AppModule { }
