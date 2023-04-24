import { Todo } from './todo.model';

export class TodoService {
  static async addTodoCard(taskName: string, comment: string, date: Date) {
    const todo = new Todo({
      taskName,
      comment,
      date,
    });
    await todo.save();
    return todo;
  }

  static async getAllTodoCards() {
    const todos = await Todo.find().sort({ date: 'desc' });
    return todos;
  }
}
