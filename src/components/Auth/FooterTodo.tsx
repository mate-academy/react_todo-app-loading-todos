import classnames from 'classnames';
import { Filters } from '../../types/Filters';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setCurrentFilter: React.Dispatch<React.SetStateAction<Filters>>;
  islinkAll: boolean;
  islinkActive: boolean;
  islinkCompleted: boolean;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export const FooterTodo: React.FC<Props> = ({
  todos,
  setCurrentFilter,
  islinkAll,
  islinkActive,
  islinkCompleted,
  setValue,
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
            selected: islinkAll,
          })}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          onClick={() => setCurrentFilter(Filters.Active)}
          className={classnames('filter__link', {
            selected: islinkActive,
          })}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          onClick={() => setCurrentFilter(Filters.Completed)}
          className={classnames('filter__link', {
            selected: islinkCompleted,
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
