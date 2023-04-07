import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { Filters } from '../types/Filters';

type Props = {
  todos: Todo[];
  filter: Filters | string;
  onSetFilter: (filter: Filters | string) => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  filter,
  onSetFilter,
}) => {
  const activeTodos = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${activeTodos} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames(
            'filter__link',
            { selected: filter === 'all' },
          )}
          onClick={() => {
            onSetFilter('all');
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: filter === 'active' },
          )}
          onClick={() => {
            onSetFilter('active');
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: filter === 'completed' },
          )}
          onClick={() => {
            onSetFilter('completed');
          }}
        >
          Completed
        </a>
      </nav>
      {todos.find(todo => todo.completed) && (
        <button
          type="button"
          className="todoapp__clear-completed"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};


