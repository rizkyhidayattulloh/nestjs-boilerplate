import { ConfigFactory } from '@nestjs/config';
import app from './app';
import database from './database';
import jwt from './jwt';

export const config: ConfigFactory[] = [app, database, jwt];
