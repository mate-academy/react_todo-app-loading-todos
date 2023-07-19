import { useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  visibleTodos: Todo[];
  isLoading: boolean;
};

export const TodoList: React.FC<Props> = ({ visibleTodos, isLoading }) => {
  const [isEditing] = useState(false);

  return (
    <section className="todoapp__main">
      {visibleTodos.map(({
        id, title, completed,
      }) => (
        <div
          className={cn('todo', { completed })}
          key={id}
        >
          <label className="todo__status-label">
            <input
              type="checkbox"
              className="todo__status"
              defaultChecked={completed}
            />
          </label>

          {isEditing ? (
            <form>
              <input
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value="Todo is being edited now"
              />
            </form>
          ) : (
            <>
              <span className="todo__title">{title}</span>
              <button
                type="button"
                className="todo__remove"
              >
                ×
              </button>
            </>
          )}

          <div className={cn('modal overlay', {
            'is-active': isLoading,
          })}
          >
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
