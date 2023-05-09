import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { Errors } from '../../types/Errors';

  type Props = {
    todo: Todo,
    onChangeIsError: (e: Errors) => void
  };

export const TodoItem: React.FC<Props> = ({ todo, onChangeIsError }) => {
  const handleDeleteTodo = () => {
    onChangeIsError(Errors.DELETE);
  };

  const handleUpdateTodo = () => {
    onChangeIsError(Errors.UPDATE);
  };

  return (
    <>
      <section className="todoapp__main">
        <div
          className={classNames('todo', { completed: todo.completed === true })}
        >
          <label className="todo__status-label">
            <input
              type="checkbox"
              className="todo__status"
            />
          </label>

          <span
            className="todo__title"
            onDoubleClick={handleUpdateTodo}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            onClick={handleDeleteTodo}
          >
            ×
          </button>

          <div className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      </section>
    </>
  );
};
