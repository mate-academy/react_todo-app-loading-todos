import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  filterValue: string;
  handlerFilterValue: (filter: string) => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  filterValue,
  handlerFilterValue,
}) => {
  const todosRemoved = todos.filter(({ completed }) => !completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todosRemoved} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames(
            'filter__link',
            { selected: filterValue === 'All' },
          )}
          onClick={() => handlerFilterValue('All')}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: filterValue === 'Active' },
          )}
          onClick={() => handlerFilterValue('Active')}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: filterValue === 'Completed' },
          )}
          onClick={() => handlerFilterValue('Completed')}
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
