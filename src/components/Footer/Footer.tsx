import { Todo } from '../../types/Todo';
import { FilterType } from '../../types/Filter';
import classNames from 'classnames';

type Props = {
  filteredTodos: Todo[],
  getFilteredBy: (param: FilterType) => void;
  selectedButtonType: FilterType;
}

export const Footer: React.FC<Props> = (props) => {
  const { filteredTodos, getFilteredBy, selectedButtonType } = props;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="todosCounter">
      {`${filteredTodos.length} items left`}
    </span>

    <nav className="filter" data-cy="Filter">
      <a
        data-cy="FilterLinkAll"
        href="#/"
        className={classNames(
          'filter__link',
          {selected: selectedButtonType === FilterType.All}
        )}
        onClick={() => getFilteredBy(FilterType.All)}
      >
        All
      </a>

      <a
        data-cy="FilterLinkActive"
        href="#/active"
        className={classNames(
          'filter__link',
          {selected: selectedButtonType === FilterType.Active}
        )}
        onClick={() => getFilteredBy(FilterType.Active)}
      >
        Active
      </a>
      <a
        data-cy="FilterLinkCompleted"
        href="#/completed"
        className={classNames(
          'filter__link',
          {selected: selectedButtonType === FilterType.Completed}
        )}
        onClick={() => getFilteredBy(FilterType.Completed)}
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
  )
}
