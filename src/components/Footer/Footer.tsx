import cn from 'classnames';
import { memo } from 'react';
import { Todo } from '../../types/Todo';
import { FilterType } from '../../types/FilterType';

interface Props {
  activeTodos: Todo[],
  filterType: string,
  onChangeFilterType: React.Dispatch<React.SetStateAction<FilterType>>;
}

export const Footer: React.FC<Props> = memo(({
  activeTodos,
  filterType,
  onChangeFilterType,

}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodos.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={cn(
            'filter__link',
            { selected: filterType === FilterType.All },
          )}
          onClick={() => onChangeFilterType(FilterType.All)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={cn(
            'filter__link',
            { selected: filterType === FilterType.Active },
          )}
          onClick={() => onChangeFilterType(FilterType.Active)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={cn(
            'filter__link',
            { selected: filterType === FilterType.Completed },
          )}
          onClick={() => onChangeFilterType(FilterType.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
});
