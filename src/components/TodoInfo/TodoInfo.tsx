import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { client } from '../../utils/fetchClient';
import { Error, ErrorCloser } from '../../types/Error';

interface OneTodo {
  todo: Todo
  update: () => void
  errorHandler: (error: Error) => void
  errorCloser: (error: ErrorCloser) => void
}

export const TodoInfo: React.FC<OneTodo> = ({
  todo,
  update,
  errorHandler,
  errorCloser,
}) => {
  const buttonHandler = async () => {
    errorCloser('deletetodo');

    try {
      await client.delete(`/todos/${todo.id}`);
      update();
    } catch {
      errorHandler('deleteTodoError');
    }
  };

  const checkboxHandler = async () => {
    errorCloser('updatetodo');
    const date = {
      completed: !todo.completed,
    };

    try {
      await client.patch(`/todos/${todo.id}`, date);
      update();
    } catch {
      errorHandler('updateTodoError');
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onChange={checkboxHandler}
        />
      </label>

      <span
        data-cy="TodoTitle"
        className="todo__title"
      >
        {todo.title}
      </span>
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDeleteButton"
        onClick={buttonHandler}
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
