"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(body_parser_1.default.json());
mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost/todo-app');
const todoSchema = new mongoose_1.default.Schema({
    taskName: { type: String, required: true },
    comment: { type: String, required: true },
    date: { type: Date, required: true },
});
const Todo = mongoose_1.default.model('Todo', todoSchema);
app.post('/addtodoCard', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskName, comment, date } = req.body;
        if (!taskName || !comment || !date) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const todo = new Todo({
            taskName,
            comment,
            date,
        });
        yield todo.save();
        return res.status(200).json(todo);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}));
app.get('/getAllTodoCards', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield Todo.find().sort({ date: 'desc' });
        return res.status(200).json(todos);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}));
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
