import { ConfigFactory } from "@nestjs/config";
import app from "./app";
import database from "./database";

export const config: ConfigFactory[] = [
    app,
    database
]