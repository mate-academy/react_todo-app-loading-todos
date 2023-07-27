import { FC, useContext } from 'react';
import classNames from 'classnames';
import { TodoContext } from '../TodoContext/TodoContext';
import { FilterOptions } from '../../types/FillterOptions';

export const TodoFooter: FC = () => {
  const {
    todosCount,
    activeTodosLeft,
    filterBy,
    onFilterByChange,
  } = useContext(TodoContext);

  const filterLinkClasses = (currentOption: FilterOptions) => {
    return classNames('filter__link', {
      selected: filterBy === currentOption,
    });
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {activeTodosLeft}
        {' '}
        items left
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={filterLinkClasses(FilterOptions.All)}
          onClick={() => onFilterByChange(FilterOptions.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={filterLinkClasses(FilterOptions.Active)}
          onClick={() => onFilterByChange(FilterOptions.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={filterLinkClasses(FilterOptions.Completed)}
          onClick={() => onFilterByChange(FilterOptions.Completed)}
        >
          Completed
        </a>
      </nav>

      {(activeTodosLeft !== todosCount) && (
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      )}
    </footer>
  );
};
