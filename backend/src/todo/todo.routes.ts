import express from 'express';
import TodoController from './todo.controller';

const todoRoutes = express.Router();

todoRoutes.post('/addtodoCard', TodoController.addTodoCard);
todoRoutes.get('/getAllTodoCards', TodoController.getAllTodoCards);

export default todoRoutes;
