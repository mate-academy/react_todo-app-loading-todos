import { Todo } from '../types/Todo';
import cn from 'classnames';

type Props = {
  setSelectedFilter: (value: string) => void;
  todos: Todo[];
  selectedValue: string;
};

export const Footer: React.FC<Props> = ({
  setSelectedFilter,
  todos,
  selectedValue,
}) => {
  const hasCompleted = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        3 items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: selectedValue === 'All',
          })}
          data-cy="FilterLinkAll"
          onClick={() => setSelectedFilter('All')}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: selectedValue === 'Active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => setSelectedFilter('Active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: selectedValue === 'Completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setSelectedFilter('Completed')}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
