import cn from 'classnames';
import { Filter } from '../../types/Filter';

type Props = {
  todosCount: number;
  onFilter: (filterType: Filter) => void;
  filter: Filter;
};

export const TodosFooter: React.FC<Props> = (
  { todosCount, onFilter, filter },
) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${todosCount} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={cn('filter__link',
            { selected: filter === Filter.All })}
          onClick={() => onFilter(Filter.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link',
            { selected: filter === Filter.Active })}
          onClick={() => onFilter(Filter.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link',
            { selected: filter === Filter.Comleted })}
          onClick={() => onFilter(Filter.Comleted)}
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
