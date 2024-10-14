import React from 'react';
import cn from 'classnames';
import { Filter } from '../../types/FilterEnum';
import { Todo } from '../../types/Todo';
import { getLinkHref } from '../../utils/getLinkHref';

interface Props {
  onFilterChange: React.Dispatch<React.SetStateAction<Filter>>;
  filter: Filter;
  todos: Todo[];
}

export const Footer: React.FC<Props> = ({ onFilterChange, filter, todos }) => {
  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  const linksValues = Object.values(Filter);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {linksValues.map(linkValue => (
          <a
            key={linkValue}
            href={getLinkHref(linkValue)}
            className={cn('filter__link', { selected: filter === linkValue })}
            data-cy={`FilterLink${linkValue}`}
            onClick={() => onFilterChange(linkValue)}
          >
            {linkValue}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
