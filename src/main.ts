import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from "process";
import {databaseConnection} from "./Database/DatabaseConnection";
require("dotenv").config();

async function bootstrap() {
  await databaseConnection.initialize();
  const app = await NestFactory.create(AppModule, {cors: true});
  await app.listen(process.env.PORT);
}
bootstrap();
