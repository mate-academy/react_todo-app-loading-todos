import cn from 'classnames';
import { Todo } from '../types/Todo';
import { FilterName } from '../types/enumFilterName';

type Props = {
  activeTodos: number;
  filteredBy: FilterName;
  setFilteredBy: (FilterName: FilterName) => void;
  todos: Todo[];
};

export const Footer: React.FC<Props> = ({
  activeTodos,
  filteredBy,
  setFilteredBy,
  todos,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {[FilterName.ALL, FilterName.ACTIVE, FilterName.COMPLETED].map(link => (
          <a
            key={link}
            onClick={() => setFilteredBy(link)}
            href="#/"
            className={cn('filter__link', { selected: filteredBy === link })}
            data-cy={`FilterLink${link}`}
          >
            {link}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todos.length === activeTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
