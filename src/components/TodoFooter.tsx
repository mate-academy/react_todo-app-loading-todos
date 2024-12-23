import React, { Dispatch, SetStateAction } from 'react';
import { Todo } from '../types/Todo';
import { Filters } from '../types/Filters';

type Props = {
  currentFilter: Filters;
  setCurrentFilter: Dispatch<SetStateAction<Filters>>;
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
};

export const TodoFooter: React.FC<Props> = ({
  todos,
  setTodos,
  currentFilter,
  setCurrentFilter,
}) => {
  const activeTodos = todos.filter(todo => !todo.completed);

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filters = [
    { name: 'All', href: '#/', filter: Filters.All, dataCy: 'FilterLinkAll' },
    {
      name: 'Active',
      href: '#/active',
      filter: Filters.Active,
      dataCy: 'FilterLinkActive',
    },
    {
      name: 'Completed',
      href: '#/completed',
      filter: Filters.Completed,
      dataCy: 'FilterLinkCompleted',
    },
  ];

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos.length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {filters.map(({ name, href, filter, dataCy }) => (
          <a
            key={filter}
            href={href}
            className={`filter__link ${currentFilter === filter ? 'selected' : ''}`}
            data-cy={dataCy}
            onClick={() => setCurrentFilter(filter)}
          >
            {name}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todos.every(todo => !todo.completed)}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
