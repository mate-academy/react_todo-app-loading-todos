import React from 'react';
import classNames from 'classnames';
import { Filters } from '../../types/Filters';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  filter: Filters;
  onClick: (filter: Filters) => void;
};

export const TodoFilter: React.FC<Props> = ({ todos, filter, onClick }) => {
  const uncmpltTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <>
      {todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {`${uncmpltTodosCount} items left`}
          </span>

          <nav className="filter" data-cy="Filter">
            {Object.keys(Filters).map(filterButton => {
              const title = Filters[filterButton as keyof typeof Filters];

              return (
                <a
                  key={filterButton}
                  href="#/"
                  className={classNames('filter__link', {
                    selected: filter === title,
                  })}
                  data-cy={`FilterLink${title}`}
                  onClick={() => onClick(title)}
                >
                  {title}
                </a>
              );
            })}
          </nav>

          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            disabled={!todos.some(todo => todo.completed)}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};

// <a
//   href="#/"
//   className={classNames('filter__link', {
//     selected: filter === Filters.all,
//   })}
//   data-cy="FilterLinkAll"
//   onClick={() => onClick(Filters.all)}
// >
//   All
// </a>

// <a
//   href="#/active"
//   className={classNames('filter__link', {
//     selected: filter === Filters.active,
//   })}
//   data-cy="FilterLinkActive"
//   onClick={() => onClick(Filters.active)}
// >
//   Active
// </a>

// <a
//   href="#/completed"
//   className={classNames('filter__link', {
//     selected: filter === Filters.completed,
//   })}
//   data-cy="FilterLinkCompleted"
//   onClick={() => onClick(Filters.completed)}
// >
//   Completed
// </a>
