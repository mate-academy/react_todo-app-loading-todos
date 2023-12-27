import { FC } from 'react';
import classnames from 'classnames';
import { Todo } from '../../types/Todo';
import { FilterValue } from '../../types/FilterValue';

interface Props {
  todos: Todo[],
  setFilterValue: (value: string) => void,
  filterValue: string,
}

export const Footer: FC<Props> = (props) => {
  const {
    todos,
    setFilterValue,
    filterValue,
  } = props;

  const remainingTodosLength = todos.filter(todo => !todo.completed).length;
  const completedTodosLength = todos.filter(todo => todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${remainingTodosLength} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classnames('filter__link',
            { selected: filterValue === 'all' })}
          data-cy="FilterLinkAll"
          onClick={() => setFilterValue(FilterValue.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classnames('filter__link',
            { selected: filterValue === 'active' })}
          data-cy="FilterLinkActive"
          onClick={() => setFilterValue(FilterValue.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classnames('filter__link',
            { selected: filterValue === 'completed' })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilterValue(FilterValue.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed hidden"
        data-cy="ClearCompletedButton"
        style={{
          visibility: completedTodosLength !== 0
            ? 'visible' : 'hidden',
        }}
      >
        Clear completed
      </button>

    </footer>
  );
};
