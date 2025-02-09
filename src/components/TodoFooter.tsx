import { Filters } from '../types/Filters';
import { Todo } from '../types/Todo';
import cn from 'classnames';

type Props = {
  currentFilter: Filters;
  setCurrentFilter: (currentFilter: Filters) => void;
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};

const filters = [
  {
    name: 'All',
    href: '#/',
    filter: Filters.All,
    dataCy: 'FilterLinkAll',
  },

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

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos.length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {filters.map(({ name, href, filter, dataCy }) => (
          <a
            key={filter}
            href={href}
            className={cn('filter__link', {
              selected: currentFilter === filter,
            })}
            data-cy={dataCy}
            onClick={() => setCurrentFilter(filter)}
          >
            {name}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
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
