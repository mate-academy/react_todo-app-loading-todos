import classNames from 'classnames';
import { Todo } from '../types/Todo';

interface Props {
  filterType: string;
  setFilterType: (type: string) => void;
  todos: Todo[]
}

export const TodoFooter: React.FC<Props> = ({
  filterType,
  setFilterType,
  todos,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${todos.length} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filterType === 'all',
          })}
          onClick={() => setFilterType('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filterType === 'active',
          })}
          onClick={() => setFilterType('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterType === 'completed',
          })}
          onClick={() => setFilterType('completed')}
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
