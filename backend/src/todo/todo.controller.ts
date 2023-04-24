import { Request, Response } from 'express';
import { TodoService } from './todo.service';

class TodoController {
  static async addTodoCard(req: Request, res: Response): Promise<Response> {
    try {
      const { taskName, comment, date } = req.body;
      if (taskName || !comment || !date) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      const todo = await TodoService.addTodoCard(taskName, comment, date);
      return res.status(200).json(todo);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getAllTodoCards(req: Request, res: Response): Promise<Response> {
    try {
      const todos = await TodoService.getAllTodoCards();
      return res.status(200).json(todos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default TodoController;
