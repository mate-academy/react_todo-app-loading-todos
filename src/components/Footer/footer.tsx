import cn from 'classnames';
import '../../styles/todoapp.scss';
import { FilterStatus } from '../../types/FilterStatus';
import { Todo } from '../../types/Todo';

const filters = [
  {
    status: FilterStatus.All,
    href: '#/',
    title: 'All',
    dataCy: 'FilterLinkAll',
  },
  {
    status: FilterStatus.Active,
    href: '#/active',
    title: 'Active',
    dataCy: 'FilterLinkActive',
  },
  {
    status: FilterStatus.Completed,
    href: '#/completed',
    title: 'Completed',
    dataCy: 'FilterLinkCompleted',
  },
];

type Props = {
  todos: Todo[];
  filterStatus: FilterStatus;
  setFilterStatus: (status: FilterStatus) => void;
};

export const Footer = ({ todos, filterStatus, setFilterStatus }: Props) => {
  const todosCounter = () => {
    const activeTodos = todos?.filter(todo => !todo.completed);

    return activeTodos?.length;
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todosCounter()} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {filters.map(filter => (
          <a
            key={filter.status}
            href={filter.href}
            className={cn('filter__link', {
              selected: filterStatus === filter.status,
            })}
            data-cy={filter.dataCy}
            onClick={() => setFilterStatus(filter.status)}
          >
            {filter.title}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todos.every(todo => !todo.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
};
