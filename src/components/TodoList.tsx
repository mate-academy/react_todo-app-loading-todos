/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import { useContext, useState } from 'react';
import { StatesContext } from '../context/Store';
import classNames from 'classnames';

export const TodoList: React.FC = () => {
  const { todos, isUpdating } = useContext(StatesContext);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => {
        return (
          <div
            data-cy="Todo"
            className={classNames('todo', { ['completed']: todo.completed })}
            key={todo.id}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked
              />
            </label>
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => setIsEditing(true)}
            >
              {todo.title}
            </span>
            {isEditing ? (
              <form>
                <input
                  data-cy="TodoTitleField"
                  type="text"
                  className="todo__title-field"
                  placeholder="Empty todo will be deleted"
                  value="Todo is being edited now"
                />
              </form>
            ) : (
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
              >
                ×
              </button>
            )}
            {/* overlay will cover the todo while it is being deleted or updated */}
            <div
              data-cy="TodoLoader"
              className={classNames('modal', 'overlay', {
                ['is-active']: isUpdating,
              })}
            >
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>{' '}
          </div>
        );
      })}
    </section>
  );
};
