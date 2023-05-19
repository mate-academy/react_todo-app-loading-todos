import { FC } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { FilterCategory } from '../../utils/enums';

interface Props {
  todos: Todo[];
  filterCategory: FilterCategory;
  setFilterCategory: (filterCategory: FilterCategory) => void;
}

export const Footer:FC<Props> = ({
  todos,
  filterCategory,
  setFilterCategory,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${todos.length} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={cn('filter__link',
            { selected: filterCategory === 'All' })}
          onClick={() => setFilterCategory(FilterCategory.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link',
            { selected: filterCategory === 'Active' })}
          onClick={() => setFilterCategory(FilterCategory.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link',
            { selected: filterCategory === 'Completed' })}
          onClick={() => setFilterCategory(FilterCategory.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
