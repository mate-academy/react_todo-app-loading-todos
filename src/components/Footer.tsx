import React from 'react';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  filter: Status;
  setFilter: (s: Status) => void;
  clearCompleted: () => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  filter,
  setFilter,
  clearCompleted,
}) => {
  const activeTodosCount = todos.filter(todo => !todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount.length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Status).map(statusValue => (
          <a
            key={statusValue}
            href={statusValue === Status.All ? '#/' : `#/${statusValue}`}
            className={`filter__link ${filter === statusValue ? 'selected' : ''}`}
            data-cy={`FilterLink${statusValue.charAt(0).toUpperCase() + statusValue.slice(1)}`}
            onClick={() => setFilter(statusValue)}
          >
            {statusValue.charAt(0).toUpperCase() + statusValue.slice(1)}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!todos.some(todo => todo.completed)}
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
