import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[]
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const loader = false;

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {todos.map((todo) => (
        <div
          data-cy="Todo"
          className={classNames('todo', todo.completed && 'completed')}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          <button type="button" className="todo__remove" data-cy="TodoDelete">
            ×
          </button>

          {/* overlay will cover the todo while it is being updated */}
          <div
            data-cy="TodoLoader"
            className={classNames('modal overlay', loader && 'is-active')}
          >
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>

        </div>
      ))}

    </section>
  );
};
