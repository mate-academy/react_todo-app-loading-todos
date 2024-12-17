import classNames from 'classnames';
import { Selected } from '../types/Selected';
import { Todo } from '../types/Todo';

type Props = {
  activeTodos: Todo[];
  completedTodos: Todo[];
  selected: Selected;
  handleSelected: (selectedOption: Selected) => void;
};

export const Footer: React.FC<Props> = ({
  activeTodos,
  selected,
  completedTodos,
  handleSelected,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos.length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: selected === Selected.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => handleSelected(Selected.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: selected === Selected.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => handleSelected(Selected.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: selected === Selected.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => handleSelected(Selected.Completed)}
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
