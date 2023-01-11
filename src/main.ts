import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from "process";
import {databaseConnection} from "./Database/DatabaseConnection";
require("dotenv").config();
import * as bodyParser from 'body-parser';

async function bootstrap() {
  await databaseConnection.initialize();
  const app = await NestFactory.create(AppModule, {cors: true});
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  await app.listen(process.env.PORT);
}
bootstrap();
