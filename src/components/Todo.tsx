import { Todo as TypeTodo } from '../types/Todo';

interface TodoProps {
  todo: TypeTodo
}

export const Todo: React.FC<TodoProps> = ({ todo }) => {
  const { title, completed } = todo;

  return (
    <div className={`todo ${completed && 'completed'}`}>
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
        />
      </label>

      <span className="todo__title">{title}</span>
      <button type="button" className="todo__remove">×</button>

      <div className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
