import { Module } from '@nestjs/common';
import {UsersModule} from "./Users/users.module";
@Module({
  imports: [UsersModule]
})
export class AppModule { }
