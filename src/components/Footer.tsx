import { Status } from '../types/Status';
import { Todo } from '../types/Todo';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  filter: Status;
  setFilter: (state: Status) => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  filter,
  setFilter,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {`${todos.length} items left`}
    </span>

    {/* Active link should have the 'selected' class */}
    <nav className="filter" data-cy="Filter">
      {Object.values(Status).map(state => (
        <a
          key={state}
          href="#/"
          className={cn('filter__link', {
            selected: state === filter,
          })}
          data-cy={`filter__link ${state}`}
          onClick={() => setFilter(state)}
        >
          {state}
        </a>
      ))}
    </nav>

    {/* this button should be disabled if there are no completed todos */}
    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
    >
      Clear completed
    </button>
  </footer>
);
