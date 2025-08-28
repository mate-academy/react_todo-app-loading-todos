import cn from 'classnames';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Filter = {
  key: string;
  label: string;
  link: string;
  dataCy: string;
};

const FILTERS: Filter[] = [
  { key: 'all', label: 'All', link: '#/', dataCy: 'FilterLinkAll' },
  {
    key: 'active',
    label: 'Active',
    link: '#/active',
    dataCy: 'FilterLinkActive',
  },
  {
    key: 'completed',
    label: 'Completed',
    link: '#/completed',
    dataCy: 'FilterLinkCompleted',
  },
];

type TodoProps = {
  todos: Todo[];
  filter: string;
  onFilterChange: (filter: string) => void;
  onClearCompleted: () => void;
};
//
export const Footer: React.FC<TodoProps> = ({
  todos,
  filter,
  onFilterChange,
  onClearCompleted,
}) => {
  const incompleteCount = todos.filter(todo => !todo.completed).length;
  const hasCompleted = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${incompleteCount} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {FILTERS.map(FILTER => {
          return (
            <a
              href={FILTER.link}
              className={classNames('filter__link', {
                selected: filter === FILTER.key,
              })}
              data-cy={FILTER.dataCy}
              onClick={() => onFilterChange(FILTER.key)}
            >
              {FILTER.label}
            </a>
          );
        })}
      </nav>

      {/* this button should be disabled if there are no completed todos */}

      <button
        type="button"
        className={cn('todoapp__clear-completed')}
        data-cy="ClearCompletedButton"
        onClick={onClearCompleted}
        disabled={!hasCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
