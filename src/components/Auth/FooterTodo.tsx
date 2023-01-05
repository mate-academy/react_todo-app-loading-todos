import classnames from 'classnames';
import { Filters } from '../../types/Filters';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setCurrentFilter: React.Dispatch<React.SetStateAction<Filters>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  currentFilter: Filters;
};

export const FooterTodo: React.FC<Props> = ({
  todos,
  setCurrentFilter,
  setValue,
  currentFilter,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {` ${todos?.filter((todo) => !todo.completed)?.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          onClick={() => setCurrentFilter(Filters.All)}
          className={classnames('filter__link', {
            selected: currentFilter === Filters.All,
          })}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          onClick={() => setCurrentFilter(Filters.Active)}
          className={classnames('filter__link', {
            selected: currentFilter === Filters.Active,
          })}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          onClick={() => setCurrentFilter(Filters.Completed)}
          className={classnames('filter__link', {
            selected: currentFilter === Filters.Completed,
          })}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
        onClick={() => setValue('')}
      >
        Clear completed
      </button>
    </footer>
  );
};
