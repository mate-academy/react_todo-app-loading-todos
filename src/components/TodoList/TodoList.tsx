import cn from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(({ id, title, completed }) => (
      <div data-cy="Todo" key={id} className={cn('todo', { completed })}>
        <label className="todo__status-label" aria-label="status-checkbox">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={completed}
            onChange={() => {}}
          />
        </label>

        <span data-cy="TodoTitle" className="todo__title">
          {title}
        </span>

        <button type="button" className="todo__remove" data-cy="TodoDelete">
          ×
        </button>

        <div data-cy="TodoLoader" className="modal overlay">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    ))}
  </section>
);
