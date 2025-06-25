import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { SortType } from '../../App';

type Props = {
  todos: Todo[];
  filter: string;
  setFilter: (filter: string) => void;
};

export const Footer: React.FC<Props> = ({ todos, filter, setFilter }) => {
  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const hasCompletedTodos = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(SortType).map(type => (
          <a
            key={type}
            href={`#/${type === 'all' ? '' : type}`}
            data-cy={`FilterLink${type.charAt(0).toUpperCase() + type.slice(1)}`}
            className={classNames('filter__link', {
              selected: filter === type,
            })}
            onClick={() => setFilter(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
