import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[]
};

export const TodoList: React.FC<Props> = React.memo(
  ({ todos }) => {
    const [isEditing] = useState(false);

    return (
      <section className="todoapp__main">
        {todos.map(todo => {
          const { completed, title } = todo;

          return (
            <div
              className={classNames(
                'todo',
                { completed },
              )}
              key={todo.id}
            >
              <label className="todo__status-label">
                <input
                  type="checkbox"
                  checked={completed}
                  className="todo__status"
                  onChange={() => { }}
                />
              </label>

              {!isEditing
                ? (
                  <>
                    <span data-cy="TodoTitle" className="todo__title">
                      {title}
                    </span>
                    <button
                      type="button"
                      className="todo__remove"
                      data-cy="TodoDeleteButton"
                    >
                      ×
                    </button>
                  </>

                )
                : (
                  <form>
                    <input
                      data-cy="TodoTitleField"
                      type="text"
                      className="todo__title-field"
                      placeholder="Empty todo will be deleted"
                      defaultValue={title}
                    />
                  </form>
                )}

              <div data-cy="TodoLoader" className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          );
        })}
      </section>
    );
  },
);
