import { FC, memo } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[] | [];
}

export const TodoList: FC<Props> = memo(
  ({ todos }) => {
    return (
      <section
        className="todoapp__main"
        data-cy="TodoList"
      >
        {todos.map(({ id, completed, title: todoTitle }) => (
          <div
            key={id}
            data-cy="Todo"
            className={cn(
              'todo',
              { completed },
            )}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                defaultChecked
              />
            </label>

            <span
              data-cy="TodoTitle"
              className="todo__title"
            >
              {todoTitle}
            </span>

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDeleteButton"
            >
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
  },
);
