import { Todo } from '../types/Todo';
import cn from 'classnames';

type Props = {
  setSelectedFilter: (value: string) => void;
  todosLeft: number;
  selectedValue: string;
  completedTodos: Todo[];
};

export const Footer: React.FC<Props> = ({
  setSelectedFilter,
  todosLeft,
  selectedValue,
  completedTodos,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosLeft} items left
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
        disabled={completedTodos.length === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
