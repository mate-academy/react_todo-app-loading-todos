import classNames from 'classnames';
import { FC, memo, useContext } from 'react';
import { TodosContext } from './TodosContext';

export const TodosFooter: FC<{ todosCount: number }> = memo(({
  todosCount,
}) => {
  const {
    setTodos,
    filterType,
    setFilterType,
  } = useContext(TodosContext);

  return (
    <div className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todosCount} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames(
            'filter__link',
            { selected: filterType === 'all' },
          )}
          onClick={() => setFilterType('all')}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: filterType === 'active' },
          )}
          onClick={() => setFilterType('active')}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: filterType === 'completed' },
          )}
          onClick={() => setFilterType('completed')}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
        onClick={() => setTodos(prev => prev.filter(item => !item.completed))}
      >
        Clear completed
      </button>
    </div>
  );
});
