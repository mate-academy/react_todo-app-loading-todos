import React from 'react';
import { Filter } from './Filters';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  filter: Filter;
};

export const FilteredTodos: React.FC<Props> = ({ filter, todos }) => {
  const filteredTodos = todos.filter(item => {
    if (filter === 'active') {
      return !item.completed;
    }

    if (filter === 'completed') {
      return item.completed;
    }

    return true; // 'all'
  });

  return (
    <>
      {filteredTodos.map(tod => (
        <div
          data-cy="Todo"
          // className={`todo ${tod.completed ? 'completed' : ''}`}
          className={classNames('todo', { completed: tod.completed })}
          key={tod.id}
        >
          <label
            className="todo__status-label"
            aria-label="What needs to be done?"
          >
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={tod.completed}
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {tod.title}
          </span>

          {/* Remove button appears only on hover */}
          <button type="button" className="todo__remove" data-cy="TodoDelete">
            ×
          </button>

          {/* overlay will cover the todo while it is being deleted or updated */}
          <div data-cy="TodoLoader" className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </>
  );
};
