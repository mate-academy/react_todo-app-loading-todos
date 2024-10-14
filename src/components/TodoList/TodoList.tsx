import React from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';
import { Filter } from '../../types/FilterEnum';
import { getFilteredTodos } from '../../utils/getFilteredTodos';

interface Props {
  todos: Todo[];
  filter: Filter;
}

export const TodoList: React.FC<Props> = ({ todos, filter }) => {
  const isBeingEdited = false; // This variable will be realised in the next task
  const isBeingSaved = false; // This variable will be realised in the next task

  const filteredTodos = getFilteredTodos(todos, filter);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={cn('todo', { completed: todo.completed })}
        >
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
            />
          </label>

          {isBeingEdited ? (
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
            <>
              <span data-cy="TodoTitle" className="todo__title">
                {todo.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
              >
                ×
              </button>
            </>
          )}

          <div
            data-cy="TodoLoader"
            className={cn('modal overlay', { 'is-active': isBeingSaved })}
          >
            {/* eslint-disable-next-line max-len */}
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
