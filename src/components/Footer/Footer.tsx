import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  filterType: string,
  setFilterType: (option: string) => void,
};

export const Footer: React.FC<Props> = ({
  todos,
  filterType,
  setFilterType,
}) => {
  return (
    <>
      <footer className="todoapp__footer">
        <span className="todo-count">
          {`${todos.length} items left`}
        </span>

        <nav className="filter">
          <a
            href="#/"
            className={classNames('filter__link',
              { selected: filterType === 'all' })}
            onClick={() => setFilterType('all')}
          >
            All
          </a>

          <a
            href="#/active"
            className={classNames('filter__link',
              { selected: filterType === 'active' })}
            onClick={() => setFilterType('active')}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={classNames('filter__link',
              { selected: filterType === 'completed' })}
            onClick={() => setFilterType('completed')}
          >
            Completed
          </a>
        </nav>

        <button
          type="button"
          className="todoapp__clear-completed"
          onClick={() => setFilterType('active')}
          style={{
            display: todos.some(todo => todo.completed)
              ? 'block' : 'none',
          }}
        >
          Clear completed
        </button>
      </footer>
    </>
  );
};
