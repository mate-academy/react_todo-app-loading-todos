import cn from 'classnames';
import React from 'react';
import { FilterBy } from '../types/Filter';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[],
  filter: string,
  setFilter: (filter: FilterBy) => void;
  onRemoveCompleted: () => void,
};

export const Footer: React.FC<Props> = ({
  filter, setFilter, onRemoveCompleted, todos,
}) => {
  const completedTodos = todos.filter(todo => todo.completed);
  const activeTodos = todos.filter(todo => !todo.completed);

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${activeTodos.length} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={cn(
            'filter__link',
            { selected: filter === 'all' },
          )}
          onClick={() => {
            setFilter(FilterBy.All);
          }}
        >
          All
        </a>

        <a
          href="#/"
          className={cn(
            'filter__link',
            { selected: filter === 'active' },
          )}
          onClick={() => {
            setFilter(FilterBy.Active);
          }}
        >
          Active
        </a>

        <a
          href="#/"
          className={cn(
            'filter__link',
            { selected: filter === 'completed' },
          )}
          onClick={() => {
            setFilter(FilterBy.Completed);
          }}
        >
          Completed
        </a>
      </nav>

      {completedTodos.length > 0 && (
        <button
          type="button"
          className={cn(
            'todoapp__clear-completed',
            { 'todoapp__clear-completed__no': completedTodos.length > 0 },
          )}
          onClick={() => onRemoveCompleted()}
        >
          Clear Completed
        </button>
      )}

    </footer>
  );
};
