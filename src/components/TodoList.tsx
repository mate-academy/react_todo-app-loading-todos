import classNames from 'classnames';
import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  filteredTodos: Todo[] | [],
};

export const TodoList: React.FC<Props> = ({ filteredTodos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos?.map((todo) => {
        const { title, completed, id } = todo;

        return (
          <div
            key={id}
            data-cy="Todo"
            className={classNames(
              'todo',
              {
                completed,
              },
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

            <span data-cy="TodoTitle" className="todo__title">{title}</span>
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
        );
      })}
    </section>
  );
};
