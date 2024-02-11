import { Dispatch, SetStateAction } from 'react';
import cn from 'classnames';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setStatus: Dispatch<SetStateAction<Status>>
  status: string,
};

export const Footer: React.FC<Props> = ({
  todos,
  setStatus,
  status,
}) => {
  const someTodosToggle = todos.some(todo => todo.completed);
  const notTodosToggle = todos.filter(todo => !todo.completed);
  const itemsLeft = notTodosToggle.length === 1
    ? '1 item left'
    : `${notTodosToggle.length} items left`;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {itemsLeft}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link',
            { selected: status === Status.All })}
          data-cy="FilterLinkAll"
          onClick={() => setStatus(Status.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link',
            { selected: status === Status.Active })}
          data-cy="FilterLinkActive"
          onClick={() => setStatus(Status.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link',
            { selected: status === Status.Completed })}
          data-cy="FilterLinkCompleted"
          onClick={() => setStatus(Status.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!someTodosToggle}
      >
        Clear completed
      </button>
    </footer>
  );
};
