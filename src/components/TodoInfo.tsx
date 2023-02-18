import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { deleteTodo, toogleTodo } from '../api/todos';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { title, completed } = todo;

  const removeTodo = (todoId: number) => {
    deleteTodo(todoId);
  };

  const handleClick = (todoId: number) => {
    toogleTodo(todoId, !completed);
  };

  return (
    <li
      className={classNames(
        'todo',
        { completed },
      )}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          onClick={() => {
            handleClick(todo.id);
          }}
        />
      </label>

      <span className="todo__title">{title}</span>

      <button
        type="button"
        className="todo__remove"
        onClick={() => {
          removeTodo(todo.id);
        }}
      >
        ×
      </button>

      <div className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </li>
  );
};
