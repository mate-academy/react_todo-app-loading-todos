import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[] | []
  filterBy: string,
  setFilterBy: (str: string) => void,
};

export const Footer: React.FC<Props> = ({ todos, filterBy, setFilterBy }) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames('filter__link',
            {
              selected: filterBy === 'All',
            })}
          onClick={() => (
            setFilterBy('All')
          )}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames('filter__link',
            {
              selected: filterBy === 'active',
            })}
          onClick={() => (
            setFilterBy('active')
          )}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames('filter__link',
            {
              selected: filterBy === 'completed',
            })}
          onClick={() => (
            setFilterBy('completed')
          )}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};
