import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";
import { Toaster, toast } from "react-hot-toast";
import TodoCard from "./components/TodoCard";

interface ITodoCard {
  _id: string;
  taskName: string;
  comment: string;
  date: string;
}

function App() {
  const [todoCards, setTodoCards] = useState<ITodoCard[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const result = await axios.get("http://localhost:3001/getAllTodoCards");
        setTodoCards(result.data);
        setLoading(false);
      } catch (err: any) {
        setLoading(false);
        toast.error(err?.message || err.response.data.error);
        console.log(err.message, err.response.data.error, "err");
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newCard = { taskName, comment, date: new Date().toISOString() };
    try {
      const result = await axios.post(
        "http://localhost:3001/addtodoCard",
        newCard
      );
      setTodoCards([result.data, ...todoCards]);
      setShowModal(false);
      setTaskName("");
      setComment("");
    } catch (err: any) {
      setLoading(false);
      toast.error(err?.message || err?.response?.data?.error);
    }
  };

  const handleTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleAddCardClick = () => {
    setShowModal(true);
  };

  const disabled = !taskName || !comment;

  return (
    <div>
      <Toaster />
      <h1>Todo App</h1>
      <button onClick={handleAddCardClick}>Add Todo Card</button>
      <div className="todo-card-container">
        {loading && <p className="loading">loading ..</p>}
        {todoCards.map((todoCard) => (
         <TodoCard todoCard={todoCard}/>
        ))}
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <label>
                Task Name:
                <input
                  type="text"
                  value={taskName}
                  onChange={handleTaskNameChange}
                />
              </label>
              <label>
                Comment:
                <input
                  type="text"
                  value={comment}
                  onChange={handleCommentChange}
                />
              </label>
              <button type="submit" disabled={disabled}>
                Submit
              </button>
            </form>
            <button onClick={handleModalClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
