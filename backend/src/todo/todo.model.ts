import mongoose from 'mongoose';

export interface ITodo extends mongoose.Document {
  taskName: string;
  comment: string;
  date: Date;
}

const todoSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  comment: { type: String, required: true },
  date: { type: Date, required: true },
});

export const Todo = mongoose.model<ITodo>('Todo', todoSchema);
