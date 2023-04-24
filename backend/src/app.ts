import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { db } from './config/db';
import * as dotenv from 'dotenv';
import todoRoutes from './todo/todo.routes';

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/', todoRoutes);

app.listen(port, async () => {
  await db();
  console.log(`Server started on port ${port}`);
});
