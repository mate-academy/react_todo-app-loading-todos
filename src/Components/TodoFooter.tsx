import React from 'react';
import classNames from 'classnames';
import { FilterTodo } from '../types/FilterTodo';
import { Todo } from '../types/Todo';
import { filterTodo } from '../Services/Todo';

type Filter = {
  label: string;
  href: string;
  dataCy: string;
  filter: FilterTodo;
};

type Props = {
  currentFilter: FilterTodo;
  todos: Todo[];
  onChangeFilter: (filter: FilterTodo) => void;
};

const TodoFooterComponent: React.FC<Props> = ({
  currentFilter,
  todos,
  onChangeFilter,
}) => {
  const filters: Filter[] = [
    { label: 'All', href: '#/', dataCy: 'FilterLinkAll', filter: 'all' },
    {
      label: 'Active',
      href: '#/active',
      dataCy: 'FilterLinkActive',
      filter: 'active',
    },
    {
      label: 'Completed',
      href: '#/completed',
      dataCy: 'FilterLinkCompleted',
      filter: 'completed',
    },
  ];

  const completedTodos = filterTodo(todos, 'completed');

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.length - completedTodos.length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {filters.map(({ label, href, dataCy, filter }) => (
          <a
            key={filter}
            href={href}
            data-cy={dataCy}
            onClick={() => onChangeFilter(filter)}
            className={classNames('filter__link', {
              selected: currentFilter === filter,
            })}
          >
            {label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedTodos.length === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};

export const TodoFooter = React.memo(TodoFooterComponent);
