
interface ITodoCard {
  _id: string;
  taskName: string;
  comment: string;
  date: string;
}

const TodoCard = ({todoCard}:{todoCard:ITodoCard}) => {
  return (
    <div className="todo-card">
      <div className="todo-list">
        <h2>taskName</h2>
        <p>{todoCard.taskName}</p>
      </div>

      <div className="todo-list">
        <p>comment</p>
        <p>{todoCard.comment}</p>
      </div>
      <div className="todo-list">
        <p>date</p>
        <p>{todoCard.date}</p>
      </div>
    </div>
  );
};

export default TodoCard;
