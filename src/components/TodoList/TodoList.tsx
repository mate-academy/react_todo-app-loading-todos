import classNames from 'classnames';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC<{ todos: Todo[] }> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      <ul className="todolist">
        {todos.map(({ id, title, completed }) => (
          <li
            key={id}
            data-cy="Todo"
            className={classNames('todo', { completed })}
          >
            <label aria-label="Todo status" className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={completed}
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              {title}
            </span>
            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>
            {/* 'is-active' class puts this modal on top of the todo */}
            <div data-cy="TodoLoader" className="modal overlay">
              <div className="-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
