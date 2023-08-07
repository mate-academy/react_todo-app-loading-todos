import classNames from 'classnames';
import { FilterType } from '../types/FilterType';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[],
  filter: FilterType,
  onFilterChange: (filter: FilterType) => void,
};

const filters = [
  { href: '#/', status: FilterType.All },
  { href: '#/active', status: FilterType.Active },
  { href: '#/completed', status: FilterType.Completed },
];

export const TodoFilter: React.FC<Props> = ({
  todos, filter, onFilterChange,
}) => {
  const todosLeft = todos.filter(todo => !todo.completed);
  const isSomeCompleted = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${todosLeft.length} items left`}
      </span>

      <nav className="filter">
        {filters.map(({ href, status }) => (
          <a
            href={href}
            className={classNames('filter__link', {
              selected: status === filter,
            })}
            onClick={() => onFilterChange(status)}
            key={status}
          >
            {status}
          </a>
        ))}
      </nav>

      {isSomeCompleted && (
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      )}
    </footer>
  );
};
