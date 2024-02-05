import { useContext, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
// eslint-disable-next-line import/no-cycle
import { TodoContext } from './TodosContext';

interface Props {
  todo: Todo;
  toggleCompleted: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const todoContext = useContext(TodoContext);
  const [isEditing, setEditing] = useState(false);
  // const [title, setTitle] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggleTodo = () => {
    todoContext?.toggleCompleted(todo.id);
  };

  const handleDeleteTodo = () => {
    todoContext?.deleteTodo(todo.id);
  };

  return (
    <div
      data-cy="Todo"
      className={todo.completed ? 'todo completed' : 'todo'}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={handleToggleTodo}
        />
      </label>

      {!!isEditing && (
        <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            ref={inputRef}
          />
        </form>
      )}

      <span
        data-cy="TodoTitle"
        className="todo__title"
        onDoubleClick={() => setEditing(true)}
      >
        {todo.title}
      </span>
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={handleDeleteTodo}
      >
        ×
      </button>

      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
