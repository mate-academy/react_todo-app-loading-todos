import cn from 'classnames';
import { Todo } from '../types/Todo';

interface Props {
  filter: string,
  todos: Todo[]
  setFilter: (text: string) => void;
}

export enum FilterStatus {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const Footer: React.FC<Props> = ({ filter, todos, setFilter }) => {
  const itemsLeft = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${itemsLeft} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filter === FilterStatus.ALL,
          })}
          onClick={() => setFilter(FilterStatus.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filter === FilterStatus.ACTIVE,
          })}
          onClick={() => setFilter(FilterStatus.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filter === FilterStatus.COMPLETED,
          })}
          onClick={() => setFilter(FilterStatus.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
