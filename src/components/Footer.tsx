import classNames from 'classnames';
import { Todo } from '../types/Todo';

interface Props {
  filter: string;
  setFilter: (filter: string) => void;
  todosNumber: number;
  visibleTodos: Todo[];
}

export const Footer: React.FC<Props> = ({
  filter, setFilter, todosNumber, visibleTodos,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${todosNumber} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', { selected: filter === 'all' })}
          onClick={() => setFilter('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames(
            'filter__link', { selected: filter === 'active' },
          )}
          onClick={() => setFilter('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames(
            'filter__link', { selected: filter === 'completed' },
          )}
          onClick={() => setFilter('completed')}
        >
          Completed
        </a>
      </nav>

      {visibleTodos.filter(todo => todo.completed).length === 0
      || (
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      )}
    </footer>
  );
};
